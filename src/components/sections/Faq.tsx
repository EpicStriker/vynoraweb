"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/config/site";
import { cn } from "@/lib/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" title="Questions, answered.">
            The basics of getting started with VYNORA.
          </SectionHeading>
        </div>

        <div className="divide-y divide-white/[0.08] overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={cn("transition-colors", isOpen && "bg-white/[0.03]")}>
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6"
                  >
                    <span className="text-[1.02rem] font-semibold text-white sm:text-lg">{item.q}</span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        isOpen ? "rotate-45 border-violet-400/60 bg-violet-500/20 text-violet-200" : "border-white/15 text-dim",
                      )}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-dim max-w-[62ch] px-6 pb-6 text-[15px] leading-relaxed text-pretty sm:px-8 sm:text-base">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
