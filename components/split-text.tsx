"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { ease } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  unit?: "word" | "char";
  delay?: number;
  stagger?: number;
  duration?: number;
  yOffset?: number;
  whileInView?: boolean;
} & Pick<MotionProps, "style">;

export function SplitText({
  text,
  as = "span",
  className,
  unit = "word",
  delay = 0,
  stagger = 0.04,
  duration = 0.7,
  yOffset = 18,
  whileInView = false,
  style,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const Tag = as as any;

  const pieces =
    unit === "word"
      ? text.split(/(\s+)/) // keeps whitespace tokens so spacing renders correctly
      : text.split("");

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: yOffset, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease },
    },
  };

  const animationProps = whileInView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.3 } }
    : { initial: "hidden", animate: "show" };

  return (
    <motion.span
      {...animationProps}
      variants={container}
      className={className}
      style={style}
      aria-label={text}
    >
      {pieces.map((piece, i) => {
        if (piece.match(/^\s+$/)) {
          return (
            <span key={i} aria-hidden style={{ whiteSpace: "pre" }}>
              {piece}
            </span>
          );
        }
        return (
          <span
            key={i}
            aria-hidden
            style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em" }}
          >
            <motion.span
              variants={child}
              style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
            >
              {piece}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
