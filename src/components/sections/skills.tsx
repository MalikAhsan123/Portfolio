"use client";

import { motion } from "framer-motion";
import { skills } from "@/data";
import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";
import { fadeUpVariants } from "@/components/ui/section-wrapper";
import { Browser, Database, Wrench } from "@phosphor-icons/react";

const categoryMeta = [
  {
    icon: Browser,
    gradient: "from-violet-500/15 to-purple-500/5",
    iconBg: "bg-violet-500/15 border-violet-500/25",
    iconColor: "text-violet-400",
    barGradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Database,
    gradient: "from-blue-500/15 to-cyan-500/5",
    iconBg: "bg-blue-500/15 border-blue-500/25",
    iconColor: "text-blue-400",
    barGradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Wrench,
    gradient: "from-emerald-500/15 to-teal-500/5",
    iconBg: "bg-emerald-500/15 border-emerald-500/25",
    iconColor: "text-emerald-400",
    barGradient: "from-emerald-500 to-teal-500",
  },
];

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8">
          <SectionHeading
            eyebrow="Expertise"
            title="Skills & Technologies"
            description="A focused set of technologies I've worked with professionally across frontend, backend, and tooling."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skillGroup, groupIndex) => {
            const meta = categoryMeta[groupIndex];
            const Icon = meta.icon;
            return (
              <motion.div
                key={skillGroup.category}
                variants={fadeUpVariants}
                className={`relative p-6 rounded-2xl border border-border/50 bg-card card-shine overflow-hidden hover:border-primary/20 transition-all duration-300`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} pointer-events-none`} />

                {/* Header */}
                <div className="relative flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl border ${meta.iconBg}`}>
                    <Icon size={18} className={meta.iconColor} weight="bold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{skillGroup.category}</h3>
                    <p className="text-[11px] text-muted-foreground">{skillGroup.items.length} skills</p>
                  </div>
                </div>

                {/* Skill bars */}
                <div className="relative space-y-4">
                  {skillGroup.items.map((skill, i) => (
                    <motion.div key={skill.name} variants={fadeUpVariants} className="group">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground tabular-nums font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: i * 0.07, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${meta.barGradient}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
