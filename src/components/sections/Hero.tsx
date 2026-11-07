"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AppPreview } from "@/components/mock/AppPreview";
import { Avatar, people } from "@/components/mock/primitives";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const headline = ["Your Community.", "Your Space.", "Your VYNORA."];
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // The one orchestrated moment: the product tilts up from the page and settles flat as you scroll.
  const rotateX = useTransform(scrollY, [0, 520], [18, 0]);
  const scale = useTransform(scrollY, [0, 520], [0.93, 1]);

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="stars absolute inset-0 opacity-70 [mask-image:linear-gradient(180deg,#000,transparent_75%)]" />
        <div className="animate-drift-a absolute -top-40 -left-32 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.5),transparent_65%)] blur-3xl" />
        <div className="animate-drift-b absolute top-10 -right-40 h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.42),transparent_65%)] blur-3xl" />
        <div className="absolute top-[38%] left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(34,211,238,0.16),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <h1 className="font-display text-[clamp(1.7rem,6.6vw,5.75rem)] leading-[1.06] font-semibold">
          {headline.map((line, i) => (
            <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.12em]">
              <motion.span
                className="text-silver block"
                initial={reduce ? false : { y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.15 + i * 0.13, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          <p className="text-dim max-w-[52ch] text-pretty text-base leading-relaxed sm:text-lg">
            Bring your friends, communities, and conversations together. VYNORA is a place where people connect through
            messaging, voice channels, and shared communities.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={siteConfig.appUrl} size="lg">
              Get Started
            </Button>
            <Button href="#features" variant="secondary" size="lg">
              Explore Features
            </Button>
          </div>
        </motion.div>

        {/* Product preview */}
        <div className="relative mt-14 sm:mt-20" style={{ perspective: 1800 }}>
          <div
            aria-hidden="true"
            className="absolute -inset-x-6 -bottom-10 h-48 bg-[linear-gradient(90deg,rgba(124,58,237,0.55),rgba(74,108,247,0.5),rgba(34,211,238,0.45))] opacity-60 blur-3xl"
          />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
          >
            <motion.div
              className="gradient-border panel-shadow relative rounded-[22px] bg-void p-[6px]"
              style={reduce ? undefined : { rotateX, scale, transformOrigin: "50% 0%" }}
            >
              <AppPreview />
            </motion.div>
          </motion.div>

          {/* Floating UI, decorative */}
          <div aria-hidden="true" className="hidden lg:block">
            <div className="animate-float glass-solid absolute -top-9 left-[4%] flex items-center gap-3 rounded-2xl py-2.5 pr-5 pl-3 shadow-2xl">
              <Avatar person={people.kenji} size={38} showStatus ringClass="ring-[#14142b]" />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">Kenji joined Lounge</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                  <span className="flex h-3 items-end gap-[2px]">
                    {[0, 0.2, 0.4].map((d) => (
                      <span key={d} className="animate-wave h-full w-[3px] rounded-full bg-emerald-400" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </span>
                  Voice channel
                </div>
              </div>
            </div>

            <div
              className="animate-float glass-solid absolute -top-14 right-[3%] w-[240px] rounded-2xl p-3.5 shadow-2xl"
              style={{ animationDelay: "-2.4s" }}
            >
              <div className="flex items-center gap-3">
                <Avatar person={people.sol} size={38} />
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-white">Sol</div>
                  <div className="text-dim text-xs">Sent you a friend request</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="flex h-8 flex-1 items-center justify-center rounded-lg bg-[linear-gradient(110deg,#7c3aed,#4a6cf7)] text-xs font-bold text-white">
                  Accept
                </span>
                <span className="flex h-8 flex-1 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white">Decline</span>
              </div>
            </div>

            <div
              className="animate-float glass-solid absolute -bottom-7 left-[9%] flex items-center gap-3 rounded-full py-2 pr-5 pl-2.5 shadow-2xl"
              style={{ animationDelay: "-4.6s" }}
            >
              <span className="flex -space-x-2">
                {[people.mira, people.lena, people.nova].map((p) => (
                  <Avatar key={p.name} person={p} size={28} ringClass="ring-[#14142b]" className="rounded-full ring-2 ring-[#14142b]" />
                ))}
              </span>
              <span className="text-sm font-semibold text-white">3 in Lounge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
