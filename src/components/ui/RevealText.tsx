"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function RevealText({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealTextProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "105%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
