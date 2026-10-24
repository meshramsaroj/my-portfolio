

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { scrollToSection } from "@/components/portfolio/scroll-to-section";

type Message = {
  role: "user" | "assistant";
  content: string;
  sectionLink?: {
    label: string;
    href: string;
  } | null;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm your Portfolio Assistant. Ask me about my experience, skills, projects, or education.",
  },
];

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionsError, setSuggestionsError] = useState("");
  const [suggestionsLoaded, setSuggestionsLoaded] = useState(false);
  const requestController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!open || suggestionsLoaded) return;

    let cancelled = false;

    async function loadSuggestions() {
      setSuggestionsError("");

      try {
        const response = await fetch("/api/portfolio-chat");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load question suggestions.");
        }

        if (
          !Array.isArray(data.suggestions) ||
          !data.suggestions.every((item: unknown) => typeof item === "string")
        ) {
          throw new Error("Question suggestions were unavailable.");
        }

        if (!cancelled) {
          setSuggestions(data.suggestions);
          setSuggestionsLoaded(true);
        }
      } catch (error) {
        if (!cancelled) {
          setSuggestionsError(
            error instanceof Error
              ? error.message
              : "Unable to load question suggestions.",
          );
        }
      }
    }

    void loadSuggestions();

    return () => {
      cancelled = true;
    };
  }, [open, suggestionsLoaded]);

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  function closeChat() {
    requestController.current?.abort();
    requestController.current = null;
    setOpen(false);
    setQuestion("");
    setLoading(false);
    setMessages(initialMessages);
    setSuggestions([]);
    setSuggestionsError("");
    setSuggestionsLoaded(false);
  }

  async function sendMessage(value: string) {
    const text = value.trim();

    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
    ]);

    setQuestion("");
    setSuggestions([]);
    setSuggestionsError("");
    setLoading(true);
    const controller = new AbortController();
    requestController.current = controller;

    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: text }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          sectionLink: data.sectionLink ?? null,
        },
      ]);
      setSuggestions(
        Array.isArray(data.suggestions) ? data.suggestions : [],
      );
      setSuggestionsLoaded(true);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      if (requestController.current === controller) {
        requestController.current = null;
        setLoading(false);
      }
    }
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-50 flex flex-col items-end gap-3 sm:right-5">
      {open && (
        <section
          aria-label="Portfolio Assistant chat"
          className="mb-3 flex h-[min(480px,calc(100dvh-7rem))] max-h-[calc(100dvh-7rem)] w-[min(360px,calc(100vw-1.5rem))] min-h-0 flex-col overflow-hidden rounded-2xl border border-purple-500/30 bg-slate-950 text-white shadow-2xl"
        >
          <header className="flex shrink-0 items-center justify-between border-b border-white/10 bg-gradient-to-r from-purple-700 to-blue-700 p-4">
            <div>
              <h2 className="font-semibold">Portfolio Assistant</h2>
              <p className="text-xs text-white/75">
                Ask me about my professional background
              </p>
            </div>

            <button
              onClick={closeChat}
              aria-label="Close chat"
              className="rounded-lg px-2 py-1 hover:bg-white/10"
            >
              ✕
            </button>
          </header>

          <div
            className="min-h-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto overscroll-contain p-3"
            aria-live="polite"
          >
            {messages.map((message, index) => {
              const sectionLink = message.sectionLink;

              return (
                <div
                  key={index}
                  className={`whitespace-pre-wrap rounded-xl p-3 text-sm ${
                    message.role === "user"
                      ? "ml-auto max-w-[90%] bg-purple-600"
                      : "mr-auto max-w-[95%] bg-slate-800"
                  }`}
                >
                  {message.content}
                  {message.role === "assistant" && sectionLink && (
                    <Link
                      href={sectionLink.href}
                      onClick={(event) =>
                        scrollToSection(event, sectionLink.href)
                      }
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-slate-900"
                    >
                      {sectionLink.label}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              );
            })}

            {suggestionsError && suggestions.length === 0 && (
              <p role="status" className="text-xs text-red-300">
                {suggestionsError}
              </p>
            )}

            {suggestions.length > 0 && !loading && (
              <div className="space-y-2 pt-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    disabled={loading}
                    className="block w-full rounded-lg border border-purple-400/20 p-2 text-left text-xs text-slate-200 hover:bg-purple-500/10"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <p className="text-xs text-slate-400">
                Looking through portfolio information...
              </p>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage(question);
            }}
            className="flex shrink-0 gap-2 border-t border-white/10 p-3"
          >
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask a question..."
              maxLength={1000}
              disabled={loading}
              aria-label="Your question"
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-purple-500"
            />

            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="rounded-lg bg-purple-600 px-3 text-sm font-medium hover:bg-purple-500 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>
      )}

      <div className="flex items-center gap-3">
        {/* {!open && (
          <span className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-lg shadow-slate-950/10">
            Hi, I&apos;m your assistant
          </span>
        )} */}
        <span className="assistant-launcher-border size-14 shrink-0">
          <button
            onClick={() => (open ? closeChat() : setOpen(true))}
            aria-expanded={open}
            aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
            className="relative z-10 flex size-full items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-2xl text-white shadow-xl transition hover:scale-105"
          >
            {open ? "×" : <Sparkles className="size-6" aria-hidden="true" />}
          </button>
        </span>
      </div>
    </div>
  );
}
