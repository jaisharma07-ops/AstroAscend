"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

type RevealProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView" | "viewport"> & {
  delay?: number;
};

export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={fadeUp}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={viewportOnce}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
