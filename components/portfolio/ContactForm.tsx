"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { ArrowUpRight, LoaderCircle } from "lucide-react";

type ContactFormValues = {
  email: string;
  subject: string;
  message: string;
};

type FormStatus = {
  type: "success" | "error";
  message: string;
};

export default function ContactForm() {
  const pathname = usePathname();

  return <ContactFormFields key={pathname} />;
}

function ContactFormFields() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (status?.type !== "success") return;

    const timeoutId = window.setTimeout(() => setStatus(null), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [status]);

  async function onSubmit(values: ContactFormValues) {
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setStatus({
        type: "success",
        message: "Message sent! I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-950 caret-slate-950 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
        : "border-slate-200 focus:border-slate-500 focus:ring-slate-200"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status && (
        <p
          role="status"
          aria-live="polite"
          className={
            status.type === "success"
              ? "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
              : "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          }
        >
          {status.message}
        </p>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Your Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="your@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass(Boolean(errors.email))}
          {...register("email", {
            required: "Please enter your email address.",
            maxLength: {
              value: 254,
              message: "Email must be 254 characters or fewer.",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          })}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-2 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Job opportunity, collaboration..."
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={inputClass(Boolean(errors.subject))}
          {...register("subject", {
            required: "Please enter a subject.",
            maxLength: {
              value: 150,
              message: "Subject must be 150 characters or fewer.",
            },
            validate: (value) =>
              value.trim().length > 0 || "Subject cannot be blank.",
          })}
        />
        {errors.subject && (
          <p
            id="subject-error"
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me a little about what you'd like to discuss..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass(Boolean(errors.message))} resize-y`}
          {...register("message", {
            required: "Please enter a message.",
            maxLength: {
              value: 5000,
              message: "Message must be 5000 characters or fewer.",
            },
            validate: (value) =>
              value.trim().length > 0 || "Message cannot be blank.",
          })}
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-800 px-6 py-3.5 font-semibold text-white transition-colors hover:border-slate-700 hover:bg-white hover:text-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Sending..." : "Send Message"}
        {loading ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        )}
      </button>
    </form>
  );
}
