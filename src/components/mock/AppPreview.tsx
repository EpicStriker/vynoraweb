"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Compass, Headphones, Hash, Mic, PhoneOff, Plus, Search, Settings, Smile, Paperclip, Users, Bell } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  Avatar,
  CategoryLabel,
  ChannelRow,
  Message,
  PersonName,
  RoleChip,
  SceneImage,
  VoiceMember,
  people,
  type Person,
} from "./primitives";

export type RegionId = "servers" | "channels" | "voice" | "chat" | "members" | "profile";

/** Dims every region except the active one, and lights the active one up. */
function Region({
  id,
  active,
  className,
  children,
}: {
  id: RegionId;
  active?: RegionId | null;
  className?: string;
  children: ReactNode;
}) {
  const isActive = active === id;
  const isDim = !!active && !isActive;
  return (
    <div
      className={cn(
        "relative transition-all duration-500",
        isDim && "opacity-25 saturate-50",
        isActive &&
          "z-10 bg-violet-500/[0.07] shadow-[0_0_60px_-12px_rgba(139,92,246,0.7)] outline outline-1 -outline-offset-1 outline-violet-400/70",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ServerIcon({ label, grad, active }: { label: string; grad: string; active?: boolean }) {
  return (
    <div className="relative flex w-full justify-center">
      {active && <span className="absolute top-1/2 left-0 h-10 w-1 -translate-y-1/2 rounded-r-full bg-white" />}
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center bg-gradient-to-br text-[15px] font-bold text-white transition-all",
          active ? "rounded-2xl" : "rounded-[24px]",
          grad,
        )}
      >
        {label}
      </span>
    </div>
  );
}

function MemberRow({ person, dim }: { person: Person; dim?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-lg px-2 py-1.5", dim && "opacity-45")}>
      <Avatar person={person} size={32} showStatus ringClass="ring-ink" />
      <PersonName person={person} className="text-[14px]" />
    </div>
  );
}

function MemberGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="px-2 pt-4">
      <div className="text-faint px-2 pb-1 text-[11.5px] font-bold tracking-wide">{title}</div>
      {children}
    </div>
  );
}

interface AppPreviewProps {
  /** Highlight a single region of the interface. */
  active?: RegionId | null;
  className?: string;
  /** Accessible description of the preview. */
  label?: string;
}

const FULL = { w: 1120, h: 660 };
const COMPACT = { w: 780, h: 660 };

/**
 * A faithful-feeling sample of the VYNORA interface: server rail, channel list,
 * conversation, member list, voice channels and profile.
 * It is drawn at a fixed design size and scaled to fit its container.
 */
export function AppPreview({ active = null, className, label = "Preview of the VYNORA application interface" }: AppPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const compact = width > 0 && width < 720;
  const design = compact ? COMPACT : FULL;
  const scale = width ? width / design.w : 1;
  const height = width ? design.h * scale : undefined;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn("relative w-full overflow-hidden rounded-[18px]", !width && "aspect-[1120/660]", className)}
      style={{ height }}
    >
      <div
        aria-hidden="true"
        className="bg-ink absolute top-0 left-0 flex origin-top-left select-none"
        style={{ width: design.w, height: design.h, transform: `scale(${scale})`, visibility: width ? "visible" : "hidden" }}
      >
        {/* Server rail */}
        <Region id="servers" active={active} className="bg-void flex w-[72px] shrink-0 flex-col items-center gap-2.5 py-3">
          <span className="bg-panel-2 flex h-12 w-12 items-center justify-center rounded-2xl">
            <Image src="/brand/mark.png" alt="" width={30} height={27} />
          </span>
          <span className="my-0.5 h-0.5 w-8 rounded-full bg-white/10" />
          <ServerIcon label="P" grad="from-violet-500 to-electric" active />
          <ServerIcon label="S" grad="from-cyan-400 to-blue-500" />
          <ServerIcon label="B" grad="from-fuchsia-500 to-rose-400" />
          <ServerIcon label="N" grad="from-indigo-500 to-violet-400" />
          <span className="text-cyan flex h-12 w-12 items-center justify-center rounded-[24px] bg-white/5">
            <Plus size={22} />
          </span>
          <span className="text-faint mt-auto flex h-12 w-12 items-center justify-center rounded-[24px] bg-white/5">
            <Compass size={21} />
          </span>
        </Region>

        {/* Channel column */}
        <div className="bg-panel flex w-[248px] shrink-0 flex-col">
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.06] px-4 text-[15px] font-bold text-white">
            Pixel Forge
            <ChevronDown size={18} className="text-dim" />
          </div>

          <Region id="channels" active={active} className="flex-1 pb-2">
            <CategoryLabel>Text channels</CategoryLabel>
            <ChannelRow name="welcome" unread />
            <ChannelRow name="general" active />
            <ChannelRow name="showcase" />
            <ChannelRow name="help-desk" />
            <ChannelRow name="off-topic" />
          </Region>

          <Region id="voice" active={active}>
            <CategoryLabel>Voice channels</CategoryLabel>
            <ChannelRow name="Lounge" type="voice">
              <VoiceMember person={people.kenji} speaking />
              <VoiceMember person={people.lena} />
              <VoiceMember person={people.nova} />
            </ChannelRow>
            <ChannelRow name="Game night" type="voice">
              <VoiceMember person={people.ravi} />
            </ChannelRow>
            <div className="mx-2 mt-3 mb-2 flex items-center gap-2.5 rounded-xl bg-emerald-500/10 py-2 pr-3 pl-3 ring-1 ring-emerald-400/25">
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-bold text-emerald-300">Voice connected</div>
                <div className="text-dim truncate text-[11.5px]">Lounge / Pixel Forge</div>
              </div>
              <PhoneOff size={17} className="text-dim" />
            </div>
          </Region>

          <Region id="profile" active={active} className="bg-void/60 flex h-[60px] shrink-0 items-center gap-2.5 px-3">
            <Avatar person={people.nova} size={36} showStatus ringClass="ring-void" />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[13.5px] font-bold text-white">Nova</div>
              <div className="text-faint text-[11.5px]">Online</div>
            </div>
            <Mic size={17} className="text-dim" />
            <Headphones size={17} className="text-dim" />
            <Settings size={17} className="text-dim" />
          </Region>
        </div>

        {/* Conversation */}
        <Region id="chat" active={active} className="bg-panel-2/60 flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 shrink-0 items-center gap-2 border-b border-white/[0.06] px-4">
            <Hash size={19} className="text-faint" />
            <span className="text-[15px] font-bold text-white">general</span>
            <span className="mx-2 h-5 w-px bg-white/10" />
            <span className="text-faint truncate text-[13px]">Talk about anything with the crew</span>
            <div className="text-dim ml-auto flex items-center gap-4">
              <Bell size={18} />
              <Users size={18} />
              <span className="bg-void/70 flex h-7 w-40 items-center justify-between rounded-md px-2 text-[12px] text-faint max-lg:hidden">
                Search <Search size={14} />
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden py-3">
            <Message person={people.mira} time="Today at 10:24">
              Welcome to Pixel Forge! Rules are pinned in #welcome. Say hi when you get a minute.
            </Message>
            <Message person={people.kenji} time="Today at 10:26">
              Opening the voice lounge in five. Who is in?
            </Message>
            <Message person={people.sol} time="Today at 10:31">
              Finished the new desk setup. Thoughts?
              <SceneImage className="mt-2 h-[170px] w-[300px] max-w-full" />
            </Message>
            <Message person={people.juno} time="Today at 10:33">
              That lighting is perfect.
            </Message>
            <Message person={people.mira} time="Today at 10:34">
              Pinned it. Nice work, Sol.
            </Message>
          </div>

          <div className="shrink-0 px-4 pb-4">
            <div className="bg-void/70 flex h-11 items-center gap-3 rounded-xl border border-white/[0.06] px-3.5 text-[14px] text-faint">
              <Paperclip size={19} className="text-dim" />
              Message #general
              <Smile size={19} className="text-dim ml-auto" />
            </div>
          </div>
        </Region>

        {/* Member list */}
        {!compact && (
          <Region id="members" active={active} className="bg-ink w-[232px] shrink-0 border-l border-white/[0.05]">
            <MemberGroup title="Admin, 1">
              <MemberRow person={people.mira} />
            </MemberGroup>
            <MemberGroup title="Moderator, 1">
              <MemberRow person={people.kenji} />
            </MemberGroup>
            <MemberGroup title="Members, 5">
              <MemberRow person={people.sol} />
              <MemberRow person={people.juno} />
              <MemberRow person={people.ravi} />
              <MemberRow person={people.lena} />
              <MemberRow person={people.nova} />
            </MemberGroup>
            <MemberGroup title="Offline, 1">
              <MemberRow person={people.aria} dim />
            </MemberGroup>
          </Region>
        )}

        {/* Profile card, shown when the profile region is highlighted */}
        <div
          className={cn(
            "bg-panel-3 absolute bottom-[74px] left-[84px] z-20 w-[300px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] transition-all duration-500",
            active === "profile" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          <div className="h-20 bg-[linear-gradient(120deg,#7c3aed,#4a6cf7_60%,#22d3ee)]" />
          <div className="px-4 pb-4">
            <div className="-mt-9 mb-2">
              <Avatar person={people.nova} size={68} showStatus ringClass="ring-panel-3" />
            </div>
            <div className="text-[18px] font-bold text-white">Nova</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <RoleChip role="member" />
              <RoleChip role="mod" />
            </div>
            <div className="text-faint mt-4 text-[11px] font-bold tracking-wide">About me</div>
            <p className="text-dim mt-1 text-[13px] leading-snug">Designing by day, hanging out in the voice lounge at night.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
