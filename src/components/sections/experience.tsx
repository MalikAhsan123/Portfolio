"use client";

import { motion } from "framer-motion";
import { experience, education } from "@/data";
import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";
import { fadeUpVariants } from "@/components/ui/section-wrapper";
import { MapPin, CheckCircle, GraduationCap, ArrowUpRight } from "@phosphor-icons/react";

const companyColors = [
  { dot: "bg-violet-400", ring: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400" },
  { dot: "bg-blue-400", ring: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400" },
  { dot: "bg-emerald-400", ring: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400" },
];

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8">
          <SectionHeading
            eyebrow="Work History"
            title="Where I've worked"
            description="My professional journey building real products at great companies."
          />
        </div>

        <div className="space-y-3">
          {experience.map((job, index) => {
            const color = companyColors[index] ?? companyColors[0];
            return (
              <motion.div key={job.company} variants={fadeUpVariants}>
                <div className="group relative p-6 rounded-2xl border border-border/50 bg-card card-shine overflow-hidden hover:border-primary/20 transition-all duration-300">
                  {/* Subtle left accent */}
                  <div className={`absolute left-0 top-5 bottom-5 w-0.5 ${color.dot} rounded-full opacity-50`} />

                  <div className="pl-3 sm:pl-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${color.ring} ${color.bg} ${color.text}`}>
                            {job.company}
                          </span>
                          {index === 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{job.role}</h3>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                          <MapPin size={10} weight="fill" />
                          {job.location}
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border border-border/50 bg-secondary/50 text-muted-foreground">
                        {job.period}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {job.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-4">
                      {job.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2">
                          <CheckCircle size={13} weight="fill" className="text-primary mt-0.5 shrink-0" />
                          <span className="text-xs text-muted-foreground leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {job.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[11px] font-medium rounded-md border border-border/40 bg-secondary/30 text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Education */}
        <div className="mt-10">
          <motion.p variants={fadeUpVariants} className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Education
          </motion.p>
          {education.map((edu) => (
            <motion.div
              key={edu.institution}
              variants={fadeUpVariants}
              className="group flex items-center gap-5 p-5 rounded-2xl border border-border/50 bg-card card-shine hover:border-primary/20 transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent pointer-events-none" />
              <div className="relative h-12 w-12 rounded-xl border border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="text-primary" weight="fill" />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{edu.degree}</p>
                    <p className="text-xs text-primary mt-0.5">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin size={9} weight="fill" /> {edu.location}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border border-border/50 bg-secondary/50 text-muted-foreground">
                    {edu.period}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
