"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/data";
import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";
import { fadeUpVariants } from "@/components/ui/section-wrapper";
import GlowCard from "@/components/ui/glow-card";
import { ArrowUpRight, Circle } from "@phosphor-icons/react";

const accentMap: Record<string, string> = {
  violet: "rgba(139, 92, 246, 0.15)",
  blue: "rgba(59, 130, 246, 0.15)",
  emerald: "rgba(16, 185, 129, 0.15)",
  orange: "rgba(249, 115, 22, 0.15)",
  pink: "rgba(236, 72, 153, 0.15)",
  indigo: "rgba(99, 102, 241, 0.15)",
};

const tagColorMap: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  orange: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  pink: "bg-pink-500/10 text-pink-300 border-pink-500/20",
  indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
};

const dotColors: Record<string, string> = {
  violet: "bg-violet-400",
  blue: "bg-blue-400",
  emerald: "bg-emerald-400",
  orange: "bg-orange-400",
  pink: "bg-pink-400",
  indigo: "bg-indigo-400",
};

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects I've built"
            description="A collection of products, tools, and experiments I've shipped — from SaaS platforms to open-source libraries."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <motion.div key={project.title} variants={fadeUpVariants} className="h-full">
              <GlowCard
                glowColor={accentMap[project.accentColor] ?? accentMap.violet}
                className="group flex h-full flex-col overflow-hidden"
              >
                <div
                  className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br ${project.gradient}`}
                />

                <div className="relative flex items-center justify-between border-b border-border/40 bg-secondary/20 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  </div>
                  {project.live ? (
                    <div className="flex max-w-[45%] items-center gap-1.5 rounded-md border border-border/40 bg-secondary/50 px-2 py-1 sm:max-w-[55%] sm:px-3">
                      <Circle
                        size={6}
                        weight="fill"
                        className={`${dotColors[project.accentColor]} shrink-0`}
                      />
                      <span className="truncate font-mono text-[10px] text-muted-foreground">
                        {project.live.replace("https://", "").replace(/\/$/, "")}
                      </span>
                    </div>
                  ) : null}
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
                      aria-label={`Open ${project.title}`}
                    >
                      <ArrowUpRight size={14} weight="bold" />
                    </a>
                  ) : null}
                </div>

                {project.image ? (
                  <a
                    href={project.live ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-[16/10] overflow-hidden border-b border-border/40 bg-secondary/30"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} website hero preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </a>
                ) : null}

                <div className="relative flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                          tagColorMap[project.accentColor] ?? tagColorMap.violet
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
