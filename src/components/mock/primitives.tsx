import type { CSSProperties, ReactNode } from "react";
import { FileText, Hash, Volume2 } from "lucide-react";
import { cn } from "@/lib/cn";

/* ──────────────────────────────────────────────────────────────
 * Shared building blocks for the product mockups.
 * All names, servers and messages here are fictional sample
 * content used to illustrate the interface.
 * ────────────────────────────────────────────────────────────── */

export type Role = "admin" | "mod" | "member";
export type Status = "online" | "idle" | "dnd" | "offline";

export interface Person {
  name: string;
  grad: number;
  role: Role;
  status: Status;
}

export const people = {
  mira: { name: "Mira", grad: 0, role: "admin", status: "online" },
  kenji: { name: "Kenji", grad: 2, role: "mod", status: "online" },
  sol: { name: "Sol", grad: 3, role: "member", status: "online" },
  juno: { name: "Juno", grad: 1, role: "member", status: "idle" },
  ravi: { name: "Ravi", grad: 4, role: "member", status: "dnd" },
  lena: { name: "Lena", grad: 5, role: "member", status: "online" },
  aria: { name: "Aria", grad: 0, role: "member", status: "offline" },
  nova: { name: "Nova", grad: 4, role: "member", status: "online" },
} satisfies Record<string, Person>;

const gradients = [
  "from-violet-500 to-fuchsia-500",
  "from-sky-400 to-indigo-500",
  "from-cyan-400 to-blue-500",
  "from-fuchsia-500 to-rose-400",
  "from-indigo-500 to-violet-400",
  "from-teal-400 to-cyan-500",
];

const statusColor: Record<Status, string> = {
  online: "bg-emerald-400",
  idle: "bg-amber-400",
  dnd: "bg-rose-500",
  offline: "bg-slate-500",
};

const roleColor: Record<Role, string> = {
  admin: "text-violet-300",
  mod: "text-cyan-300",
  member: "text-mist",
};

export const roleLabel: Record<Role, string> = {
  admin: "Admin",
  mod: "Moderator",
  member: "Member",
};

/* ── Avatar ───────────────────────────────────────────────── */
export function Avatar({
  person,
  size = 36,
  showStatus = false,
  ringClass = "ring-panel",
  className,
}: {
  person: Person;
  size?: number;
  showStatus?: boolean;
  ringClass?: string;
  className?: string;
}) {
  const dot = Math.max(10, Math.round(size * 0.3));
  return (
    <span
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <span
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white",
          gradients[person.grad % gradients.length],
        )}
        style={{ fontSize: size * 0.4 }}
      >
        {person.name[0]}
      </span>
      {showStatus && (
        <span
          className={cn("absolute -right-0.5 -bottom-0.5 rounded-full ring-[3px]", statusColor[person.status], ringClass)}
          style={{ width: dot, height: dot }}
        />
      )}
    </span>
  );
}

export function PersonName({ person, className }: { person: Person; className?: string }) {
  return <span className={cn("font-semibold", roleColor[person.role], className)}>{person.name}</span>;
}

export function RoleChip({ role }: { role: Role }) {
  const styles: Record<Role, string> = {
    admin: "border-violet-400/40 bg-violet-500/15 text-violet-200",
    mod: "border-cyan-400/40 bg-cyan-500/15 text-cyan-200",
    member: "border-white/15 bg-white/5 text-mist/80",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", styles[role])}>
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          role === "admin" ? "bg-violet-400" : role === "mod" ? "bg-cyan-400" : "bg-slate-400",
        )}
      />
      {roleLabel[role]}
    </span>
  );
}

/* ── Chat ─────────────────────────────────────────────────── */
export function Message({
  person,
  time,
  children,
  avatarSize = 40,
}: {
  person: Person;
  time: string;
  children?: ReactNode;
  avatarSize?: number;
}) {
  return (
    <div className="flex gap-3.5 px-4 py-2">
      <Avatar person={person} size={avatarSize} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <PersonName person={person} className="text-[14.5px]" />
          <span className="text-faint text-[11px]">{time}</span>
        </div>
        <div className="text-mist/90 text-[14.5px] leading-snug">{children}</div>
      </div>
    </div>
  );
}

/** A pure-CSS "photo" so mockups need no external images. */
export function SceneImage({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden rounded-xl", className)}
      style={{
        background:
          "radial-gradient(circle at 72% 30%, #fde9a8 0 5.5%, rgba(253,233,168,0.35) 6% 12%, transparent 13%), linear-gradient(180deg,#1b1450 0%,#5b34d6 48%,#e86fb8 100%)",
        ...style,
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[58%] bg-[#150f3d]"
        style={{ clipPath: "polygon(0 70%, 18% 38%, 32% 60%, 52% 22%, 70% 58%, 84% 40%, 100% 66%, 100% 100%, 0 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[36%] bg-[#0a0724]"
        style={{ clipPath: "polygon(0 60%, 22% 30%, 44% 62%, 64% 28%, 82% 56%, 100% 36%, 100% 100%, 0 100%)" }}
      />
    </div>
  );
}

export function FileAttachment({ name, size }: { name: string; size: string }) {
  return (
    <div className="bg-panel-2 flex w-fit max-w-full items-center gap-3 rounded-xl border border-white/10 py-2.5 pr-5 pl-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-cyan-500/30 text-cyan-200">
        <FileText size={20} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13.5px] font-semibold text-violet-200">{name}</span>
        <span className="text-faint block text-[11.5px]">{size}</span>
      </span>
    </div>
  );
}

/* ── Channels ─────────────────────────────────────────────── */
export function ChannelRow({
  name,
  type = "text",
  active,
  unread,
  children,
}: {
  name: string;
  type?: "text" | "voice";
  active?: boolean;
  unread?: boolean;
  children?: ReactNode;
}) {
  const Icon = type === "text" ? Hash : Volume2;
  return (
    <div>
      <div
        className={cn(
          "mx-2 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[14px]",
          active ? "bg-white/10 font-semibold text-white" : unread ? "font-semibold text-white" : "text-dim",
        )}
      >
        <Icon size={16} className={active ? "text-violet-300" : "text-faint"} />
        <span className="truncate">{name}</span>
        {unread && !active && <span className="ml-auto h-2 w-2 rounded-full bg-white" />}
      </div>
      {children}
    </div>
  );
}

export function CategoryLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-faint flex items-center gap-1 px-4 pt-4 pb-1.5 text-[11.5px] font-bold tracking-wide">
      <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
        <path d="M2 3.5 5 7l3-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </div>
  );
}

export function VoiceMember({ person, speaking }: { person: Person; speaking?: boolean }) {
  return (
    <div className="mx-2 ml-7 flex items-center gap-2 rounded-lg px-2.5 py-1">
      <span className="relative inline-flex">
        {speaking && <span className="animate-speak absolute inset-0 rounded-full ring-2 ring-emerald-400" />}
        <Avatar person={person} size={22} />
      </span>
      <span className="text-dim text-[13px]">{person.name}</span>
    </div>
  );
}

/* ── Controls ─────────────────────────────────────────────── */
export function Toggle({ on }: { on?: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors",
        on ? "bg-gradient-to-r from-violet-500 to-electric" : "bg-white/15",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all",
          on ? "left-[18px]" : "left-0.5",
        )}
      />
    </span>
  );
}

/** Rounded window used by every feature mockup. */
export function MockWindow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("bg-panel panel-shadow gradient-border relative overflow-hidden rounded-2xl", className)}
    >
      {children}
    </div>
  );
}
