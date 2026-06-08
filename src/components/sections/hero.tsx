"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig, typingRoles } from "@/data";
import { ArrowRight, ArrowDown, LinkedinLogo, MapPin } from "@phosphor-icons/react";
import AnimatedText from "@/components/ui/animated-text";

function TypingAnimation({ roles }: { roles: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isPaused) {
      timeout = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1800);
      return () => clearTimeout(timeout);
    }
    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), 60);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 35);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, currentIndex, roles]);

  return (
    <span className="gradient-text">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block ml-0.5 w-0.5 h-[0.9em] bg-primary align-middle"
      />
    </span>
  );
}

const codeLines = [
  { indent: 0, content: 'const ahsan = {', color: 'text-violet-300' },
  { indent: 1, content: 'role: "MERN Stack Developer",', color: 'text-blue-300' },
  { indent: 1, content: 'stack: ["MongoDB", "Express",', color: 'text-emerald-300' },
  { indent: 2, content: '"React", "Node.js"],', color: 'text-emerald-300' },
  { indent: 1, content: 'experience: "1.5+ years",', color: 'text-amber-300' },
  { indent: 1, content: 'location: "Lahore, PK",', color: 'text-pink-300' },
  { indent: 1, content: 'available: true,', color: 'text-green-400' },
  { indent: 0, content: '};', color: 'text-violet-300' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-20 w-[700px] h-[700px] rounded-full bg-violet-600/8 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/7 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 10 }}
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-600/5 blur-[100px]"
        />
      </div>

      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-4 sm:pb-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

          {/* Left — content */}
          <div className="max-w-xl w-full">
            {/* Profile photo — mobile/tablet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:hidden mb-5"
            >
              <div className="avatar-ring p-[2px] rounded-full inline-block">
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  width={80}
                  height={80}
                  priority
                  className="h-20 w-20 rounded-full object-cover object-top border-2 border-background"
                />
              </div>
            </motion.div>

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs text-emerald-400 font-medium">{siteConfig.availability}</span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-4">
              <AnimatedText
                text={`Hi, I'm Ahsan.`}
                className="block text-foreground mb-2"
                delay={0.1}
              />
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-1">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className="text-muted-foreground font-normal"
                >
                  I am{" "}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.0 }}
                >
                  <TypingAnimation roles={typingRoles} />
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-base text-muted-foreground leading-relaxed mt-4 mb-2"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6"
            >
              <MapPin size={12} weight="fill" className="text-primary" />
              {siteConfig.location}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25"
              >
                View my work
                <ArrowRight size={15} weight="bold" className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>

              <motion.a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/80 bg-secondary/40 text-foreground font-medium text-sm hover:bg-secondary hover:border-border transition-all duration-200"
              >
                <LinkedinLogo size={15} weight="bold" />
                LinkedIn
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Hire me <ArrowRight size={13} weight="bold" />
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-8 pt-5 border-t border-border/40 flex flex-wrap gap-5 sm:gap-6"
            >
              {[
                { value: "1.5+", label: "Years experience" },
                { value: "15+", label: "Projects shipped" },
                { value: "724+", label: "NPM downloads" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — code card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-emerald-500/10 rounded-2xl blur-2xl scale-110" />

              {/* Code card */}
              <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-secondary/30">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/70" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <div className="h-3 w-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground font-mono">about-me.js</span>
                </div>

                {/* Code content */}
                <div className="p-6 font-mono text-sm leading-7">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + i * 0.08 }}
                      className="flex"
                    >
                      <span className="text-muted-foreground/30 w-6 shrink-0 text-right mr-4 text-xs select-none">
                        {i + 1}
                      </span>
                      <span style={{ paddingLeft: `${line.indent * 16}px` }} className={line.color}>
                        {line.content}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom bar */}
                <div className="px-4 py-2 border-t border-border/40 bg-secondary/20 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-mono">JavaScript</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                    available for work
                  </span>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.6 }}
                className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-card shadow-lg"
              >
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500/30 to-blue-500/20 border border-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">M</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-foreground leading-none">MERN Stack</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">Full-Stack Dev</p>
                </div>
              </motion.div>

              {/* Floating skill pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.8 }}
                className="absolute -top-4 -left-4 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-lg"
              >
                <span className="text-[11px] font-medium text-emerald-400">React.js ⚛️</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} className="text-muted-foreground/40" weight="bold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
