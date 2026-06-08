"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { navLinks, siteConfig } from "@/data";
import { cn } from "@/lib/utils";
import { LinkedinLogo, List, X } from "@phosphor-icons/react";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 100);
    setScrolled(latest > 20);
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-border/40 bg-background/85 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="group flex items-center gap-2.5"
            >
              <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                <span className="text-primary font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                Ahsan<span className="text-primary">.</span>
              </span>
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 + 0.2 }}
                  className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {link.label}
                  <span className="absolute inset-x-4 bottom-1 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.a>
              ))}
            </nav>

            {/* Right actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
              >
                <LinkedinLogo size={16} weight="bold" />
              </a>

              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 transition-all duration-200"
              >
                Hire me
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : -8 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-16 z-30 md:hidden border-b border-border bg-background/95 backdrop-blur-xl",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <nav className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-border/50">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20"
            >
              Hire me
            </a>
          </div>
        </nav>
      </motion.div>
    </>
  );
}
