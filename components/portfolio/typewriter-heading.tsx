"use client";

import { motion, useReducedMotion } from "framer-motion";

const heading =
  "Hey, I'm a Senior Software Engineer who loves turning ideas into meaningful digital experiences.";
const words = heading.split(" ");

const headingVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const characterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function TypewriterHeading() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.h1
      aria-label={heading}
      variants={headingVariants}
      initial={reducedMotion ? false : "hidden"}
      animate={reducedMotion ? undefined : "visible"}
      className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl"
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((character, characterIndex) => (
              <motion.span
                key={`${character}-${characterIndex}`}
                aria-hidden="true"
                variants={characterVariants}
                className="inline-block"
              >
                {character}
              </motion.span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </span>
      ))}
      <motion.span
        aria-hidden="true"
        animate={reducedMotion ? undefined : { opacity: [1, 0, 1] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: "linear",
        }}
        className="ml-1 inline-block h-[0.9em] w-0.5 translate-y-1 rounded-full bg-slate-950"
      />
    </motion.h1>
  );
}
