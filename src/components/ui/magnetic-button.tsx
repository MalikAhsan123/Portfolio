"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  as?: "button" | "a";
  type?: "button" | "submit" | "reset";
  strength?: number;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  target,
  rel,
  as = "button",
  type,
  strength = 30,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Tag = as as React.ElementType;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex"
    >
      <motion.div style={{ x: springX, y: springY }}>
        <Tag
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          type={type}
          className={cn(className)}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}
