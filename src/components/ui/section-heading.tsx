"use client";

import { motion } from "framer-motion";
import { fadeUpVariants } from "./section-wrapper";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <motion.p
        variants={fadeUpVariants}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUpVariants}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUpVariants}
          className="mt-3 text-muted-foreground text-base max-w-xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
