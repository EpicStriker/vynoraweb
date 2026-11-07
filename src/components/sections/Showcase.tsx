"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Hash, MessageSquare, PanelLeft, User, Users, Volume2 } from "lucide-react";
import { AppPreview, type RegionId } from "@/components/mock/AppPreview";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const areas: { id: RegionId; label: string; text: string; icon: LucideIcon }[] = [
  { id: "servers", label: "Server navigation", text: "Switch between all your servers from one rail.", icon: PanelLeft },
  { id: "channels", label: "Channel lists", text: "Text channels grouped by topic.", icon: Hash },
  { id: "chat", label: "Real-time conversations", text: "Messages, images and files in one thread.", icon: MessageSquare },
  { id: "members", label: "Member lists", text: "See who is in the server and which role they hold.", icon: Users },
  { id: "voice", label: "Voice channels", text: "Join a channel and see who is talking.", icon: Volume2 },
  { id: "profile", label: "User profiles", text: "Your name, status and roles at a glance.", icon: User },
];

export function Showcase() {
  const [active, setActive] = useState<RegionId | null>(null);
  const current = areas.find((a) => a.id === active);

  return (
    <section id="showcase" aria-labelledby="showcase-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 h-[560px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.28),transparent_68%)] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <SectionHeading id="showcase-title" title="Everything Your Community Needs. All in One Place." align="center">
          One interface for your servers, channels, conversations, members, voice and profile.
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[300px_1fr] lg:gap-8">
          {/* Area selector */}
          <div
            role="group"
            aria-label="Highlight an area of the interface"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0"
          >
            {areas.map(({ id, label, text, icon: Icon }) => {
              const on = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(id)}
                  onMouseEnter={() => setActive(id)}
                  onFocus={() => setActive(id)}
                  className={cn(
                    "group flex shrink-0 items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 lg:w-full",
                    on
                      ? "border-violet-400/50 bg-violet-500/10 shadow-[0_0_40px_-12px_rgba(139,92,246,0.8)]"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                      on ? "bg-violet-500/30 text-violet-200" : "bg-white/5 text-cyan",
                    )}
                  >
                    <Icon size={17} />
                  </span>
                  <span className="block">
                    <span className="block text-sm font-semibold whitespace-nowrap text-white lg:whitespace-normal">{label}</span>
                    <span className="text-dim mt-0.5 hidden text-[13px] leading-snug lg:block">{text}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Large preview */}
          <div onMouseLeave={() => setActive(null)}>
            <div className="gradient-border panel-shadow rounded-[24px] bg-void p-1.5 sm:p-2">
              <AppPreview active={active} label="The VYNORA interface with server navigation, channels, conversation, members, voice and profile" />
            </div>
            <p className="text-dim mt-4 min-h-6 text-center text-sm" aria-live="polite">
              {current ? current.text : "Select an area to highlight it."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
