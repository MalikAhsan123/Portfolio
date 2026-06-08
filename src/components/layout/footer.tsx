"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data";
import { LinkedinLogo, ArrowUp, Heart } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-background overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-500/3 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-7">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
              <span className="text-primary font-bold text-xs">A</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              <span className="text-foreground font-medium">{siteConfig.name}</span>
            </p>
          </div>

          {/* Center — built with */}
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Built with <Heart size={11} weight="fill" className="text-pink-400" /> using Next.js & Tailwind
          </p>

          {/* Right */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            >
              <LinkedinLogo size={15} weight="bold" />
            </a>

            <div className="w-px h-4 bg-border" />

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
              aria-label="Back to top"
            >
              <ArrowUp size={15} weight="bold" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
