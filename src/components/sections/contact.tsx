"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { sendContactEmail } from "@/app/actions/contact";
import { siteConfig } from "@/data";
import SectionWrapper from "@/components/ui/section-wrapper";
import { fadeUpVariants } from "@/components/ui/section-wrapper";
import GlowCard from "@/components/ui/glow-card";
import {
  EnvelopeSimple,
  LinkedinLogo,
  ArrowRight,
  PaperPlaneTilt,
  Sparkle,
  MapPin,
  ChatCircleDots,
} from "@phosphor-icons/react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const result = await sendContactEmail(formState);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    } else {
      setError(result.message);
    }
  }

  const socialLinks = [
    { href: siteConfig.social.linkedin, Icon: LinkedinLogo, label: "LinkedIn", handle: "muhammad-ahsan-raza", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  ];

  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Section header centered */}
        <motion.div variants={fadeUpVariants} className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Let&apos;s work{" "}
            <span className="gradient-text">together.</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
            I&apos;m always open to interesting projects, collaborations, or just a great conversation about engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 items-start">

          {/* Left — info cards */}
          <div className="lg:col-span-2 space-y-3">
            {/* Email card */}
            <motion.a
              variants={fadeUpVariants}
              href={`mailto:${siteConfig.email}`}
              whileHover={{ scale: 1.02 }}
              className="group flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:bg-primary/3 transition-all duration-300 card-shine"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <EnvelopeSimple size={18} className="text-primary" weight="fill" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground truncate">{siteConfig.email}</p>
              </div>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" weight="bold" />
            </motion.a>

            {/* Location card */}
            <motion.div
              variants={fadeUpVariants}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card card-shine"
            >
              <div className="h-10 w-10 rounded-xl bg-secondary border border-border/50 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-muted-foreground" weight="fill" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Based in</p>
                <p className="text-sm font-medium text-foreground">{siteConfig.location}</p>
              </div>
            </motion.div>

            {/* Social links */}
            {socialLinks.map(({ href, Icon, label, handle, color }) => (
              <motion.a
                key={href}
                variants={fadeUpVariants}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card hover:border-border transition-all duration-300 card-shine"
              >
                <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${color}`}>
                  <Icon size={18} weight="bold" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground">{handle}</p>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" weight="bold" />
              </motion.a>
            ))}

            {/* Availability badge */}
            <motion.div
              variants={fadeUpVariants}
              className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
            >
              <Sparkle size={18} className="text-emerald-400 shrink-0" weight="fill" />
              <div>
                <p className="text-sm font-medium text-emerald-400">{siteConfig.availability}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Usually replies within 24 hours</p>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-3 w-full min-w-0">
            <GlowCard className="p-5 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-14 text-center gap-4"
                >
                  <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                    <PaperPlaneTilt size={28} className="text-emerald-400" weight="fill" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Message sent!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setError(""); }}
                    className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <ChatCircleDots size={18} className="text-primary" weight="fill" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Send a message</h3>
                      <p className="text-xs text-muted-foreground">I&apos;ll get back to you shortly</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Name</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Email</label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell me about your project or idea..."
                        className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        {error}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary/20"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <PaperPlaneTilt size={15} weight="bold" />
                          Send message
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
