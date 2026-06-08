"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig, aboutStats, techStack } from "@/data";
import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";
import { fadeUpVariants } from "@/components/ui/section-wrapper";
import {
  MapPin,
  EnvelopeSimple,
  Sparkle,
  Briefcase,
  FolderOpen,
  Buildings,
  Package,
} from "@phosphor-icons/react";

const statIcons = [Briefcase, FolderOpen, Buildings, Package];

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">

          {/* Left column */}
          <div>
            <SectionHeading
              eyebrow="About Me"
              title="Turning ideas into impactful products."
              description={undefined}
            />

            <motion.div variants={fadeUpVariants} className="mt-4 space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Currently working as a{" "}
                <span className="text-foreground font-medium">MERN Stack Developer at Robust Agency</span>
                , Lahore. Previously contributed to impactful products at{" "}
                <span className="text-foreground font-medium">TECISOL</span> and interned at{" "}
                <span className="text-foreground font-medium">NETSOL Technologies</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I also published an open-source NPM package —{" "}
                <span className="text-foreground font-medium">one-linear-validator</span>
                {" "}— that gained 724+ downloads in its first 14 hours. I thrive in dynamic
                environments and love shipping software that people actually use.
              </p>
            </motion.div>

            {/* Contact info */}
            <motion.div variants={fadeUpVariants} className="mt-6 space-y-2">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="p-1.5 rounded-md bg-primary/10 border border-primary/15">
                  <MapPin size={13} className="text-primary" weight="fill" />
                </div>
                {siteConfig.location}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="p-1.5 rounded-md bg-primary/10 border border-primary/15">
                  <EnvelopeSimple size={13} className="text-primary" weight="fill" />
                </div>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <Sparkle size={13} className="text-emerald-400" weight="fill" />
                </div>
                <span className="text-emerald-400 font-medium">{siteConfig.availability}</span>
              </div>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={fadeUpVariants} className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Tech I work with
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Avatar card */}
            <motion.div variants={fadeUpVariants} className="relative">
              <div className="p-6 rounded-2xl border border-border/50 bg-card card-shine overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />

                <div className="relative flex items-center gap-4 sm:gap-5">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="avatar-ring p-[2px] rounded-full">
                      <Image
                        src={siteConfig.profileImage}
                        alt={siteConfig.name}
                        width={96}
                        height={96}
                        priority
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover object-top border-2 border-background"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-400 border-2 border-background flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-emerald-900" />
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-semibold text-foreground text-base sm:text-lg leading-tight">{siteConfig.name}</h3>
                    <p className="text-sm text-primary mt-0.5">{siteConfig.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin size={10} weight="fill" className="text-primary" />
                      {siteConfig.location}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative mt-5 mb-4 h-px bg-border/50" />

                {/* Quick bio chips */}
                <div className="relative flex flex-wrap gap-2">
                  {["1.5+ yrs exp", "MERN Stack", "Open Source", "Available"].map((chip) => (
                    <span key={chip} className="px-2.5 py-1 text-xs rounded-full border border-border/50 bg-secondary/50 text-muted-foreground">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={fadeUpVariants} className="grid grid-cols-2 gap-3">
              {aboutStats.map((stat, i) => {
                const Icon = statIcons[i];
                return (
                  <div
                    key={stat.label}
                    className="group p-5 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:bg-primary/3 transition-all duration-300 card-shine"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                      <div className="p-1.5 rounded-md bg-primary/10 border border-primary/15 group-hover:bg-primary/20 transition-colors">
                        <Icon size={13} className="text-primary" weight="fill" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors leading-tight">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
