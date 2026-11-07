import { Check, Headphones, Hash, MessageSquare, Mic, PhoneOff, Plus, Settings, Smile, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  Avatar,
  CategoryLabel,
  ChannelRow,
  FileAttachment,
  Message,
  MockWindow,
  RoleChip,
  SceneImage,
  Toggle,
  people,
  type Person,
} from "./primitives";

/* Each mock illustrates one capability from the brief.
   All content is fictional sample data. */

const fieldLabel = "text-faint text-[11.5px] font-bold tracking-wide";

/* ── 1. Community servers ─────────────────────────────────── */
export function ServersMock() {
  const invites: [Person, boolean][] = [
    [people.sol, true],
    [people.juno, false],
    [people.lena, false],
  ];
  return (
    <MockWindow className="mx-auto w-full max-w-[560px]">
      <div className="flex">
        <div className="bg-void flex w-[68px] shrink-0 flex-col items-center gap-2.5 py-4">
          {["from-violet-500 to-electric", "from-cyan-400 to-blue-500", "from-fuchsia-500 to-rose-400"].map((g, i) => (
            <span key={g} className={cn("flex h-11 w-11 items-center justify-center rounded-[22px] bg-gradient-to-br text-sm font-bold text-white", g)}>
              {["P", "S", "B"][i]}
            </span>
          ))}
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan/15 text-cyan ring-1 ring-cyan/60">
            <Plus size={22} />
          </span>
        </div>
        <div className="min-w-0 flex-1 p-5 sm:p-7">
          <div className="text-lg font-bold text-white">Create your server</div>
          <p className="text-dim mt-1 text-[13.5px]">Give your community a name and a place to gather.</p>

          <div className="mt-6 flex items-end gap-4">
            <span className="text-dim flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-white/25">
              <Plus size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <div className={fieldLabel}>Server name</div>
              <div className="bg-void/80 mt-1.5 flex items-center rounded-lg border border-violet-400/50 px-3 py-2.5 text-[14.5px] text-white shadow-[0_0_0_3px_rgba(139,92,246,0.15)]">
                Pixel Forge
                <span className="ml-0.5 inline-block h-4 w-px bg-white/80" />
              </div>
            </div>
          </div>

          <div className={cn(fieldLabel, "mt-6")}>Invite friends</div>
          <div className="mt-2 space-y-1.5">
            {invites.map(([p, done]) => (
              <div key={p.name} className="bg-panel-2/70 flex items-center gap-3 rounded-lg px-3 py-2">
                <Avatar person={p} size={30} />
                <span className="text-[14px] font-semibold text-white">{p.name}</span>
                <span
                  className={cn(
                    "ml-auto rounded-md px-3 py-1 text-[12px] font-bold",
                    done ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-white",
                  )}
                >
                  {done ? "Invited" : "Invite"}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex h-11 items-center justify-center rounded-xl bg-[linear-gradient(110deg,#7c3aed,#4a6cf7_60%,#22b8e8)] text-[14px] font-bold text-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.8)]">
            Create server
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/* ── 2. Text channels ─────────────────────────────────────── */
export function ChannelsMock() {
  return (
    <MockWindow className="mx-auto w-full max-w-[600px]">
      <div className="flex">
        <div className="bg-ink hidden w-[200px] shrink-0 pb-4 sm:block">
          <div className="flex h-12 items-center border-b border-white/[0.06] px-4 text-[14.5px] font-bold text-white">Pixel Forge</div>
          <CategoryLabel>Information</CategoryLabel>
          <ChannelRow name="welcome" />
          <ChannelRow name="announcements" unread />
          <CategoryLabel>Community</CategoryLabel>
          <ChannelRow name="general" active />
          <ChannelRow name="showcase" />
          <ChannelRow name="help-desk" />
          <CategoryLabel>Hobbies</CategoryLabel>
          <ChannelRow name="music" />
          <ChannelRow name="game-night" />
        </div>
        <div className="bg-panel-2/50 min-w-0 flex-1">
          <div className="flex h-12 items-center gap-2 border-b border-white/[0.06] px-4">
            <Hash size={18} className="text-faint" />
            <span className="text-[14.5px] font-bold text-white">general</span>
          </div>
          <div className="py-2">
            <Message person={people.kenji} time="10:26" avatarSize={36}>
              Which channel should the monthly meetup go in?
            </Message>
            <Message person={people.mira} time="10:27" avatarSize={36}>
              Let&apos;s keep it in #general and pin the plan.
            </Message>
            <Message person={people.lena} time="10:29" avatarSize={36}>
              Perfect. Moving my music links to #music.
            </Message>
          </div>
          <div className="px-4 pb-4">
            <div className="bg-void/70 text-faint flex h-10 items-center rounded-lg px-3 text-[13.5px]">Message #general</div>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/* ── 3. Voice channels ────────────────────────────────────── */
function VoiceTile({ person, speaking, tone }: { person: Person; speaking?: boolean; tone: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br transition",
        tone,
        speaking && "ring-2 ring-emerald-400 shadow-[0_0_30px_-4px_rgba(52,211,153,0.6)]",
      )}
    >
      <Avatar person={person} size={56} />
      <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 text-[12px] font-semibold text-white">
        {speaking ? (
          <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
            {[0, 0.2, 0.4].map((d) => (
              <span key={d} className="animate-wave h-full w-[3px] rounded-full bg-emerald-400" style={{ animationDelay: `${d}s` }} />
            ))}
          </span>
        ) : (
          <Mic size={12} className="text-dim" />
        )}
        {person.name}
      </span>
    </div>
  );
}

export function VoiceMock() {
  return (
    <MockWindow className="mx-auto w-full max-w-[560px]">
      <div className="flex h-12 items-center gap-2 border-b border-white/[0.06] px-4">
        <span className="text-faint text-lg leading-none">&#9835;</span>
        <span className="text-[14.5px] font-bold text-white">Lounge</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11.5px] font-bold text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Connected
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4 sm:p-5">
        <VoiceTile person={people.kenji} speaking tone="from-[#1d2a6b] to-[#2b1a63]" />
        <VoiceTile person={people.lena} tone="from-[#14304f] to-[#1b2057]" />
        <VoiceTile person={people.nova} tone="from-[#2d1860] to-[#16164a]" />
        <VoiceTile person={people.ravi} tone="from-[#14405a] to-[#1d1b5c]" />
      </div>
      <div className="flex items-center justify-center gap-3 pb-5">
        {[Mic, Headphones].map((Icon, i) => (
          <span key={i} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
            <Icon size={19} />
          </span>
        ))}
        <span className="flex h-11 w-14 items-center justify-center rounded-full bg-rose-500 text-white shadow-[0_8px_24px_-6px_rgba(244,63,94,0.7)]">
          <PhoneOff size={19} />
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
          <Settings size={19} />
        </span>
      </div>
    </MockWindow>
  );
}

/* ── 4. Friends and direct messages ───────────────────────── */
function FriendRow({ person, note }: { person: Person; note: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-2.5 py-2 hover:bg-white/5">
      <Avatar person={person} size={34} showStatus />
      <div className="min-w-0 leading-tight">
        <div className="text-[14px] font-semibold text-white">{person.name}</div>
        <div className="text-faint text-[12px]">{note}</div>
      </div>
      <span className="bg-panel-3 text-dim ml-auto flex h-8 w-8 items-center justify-center rounded-full">
        <MessageSquare size={15} />
      </span>
    </div>
  );
}

export function FriendsMock() {
  return (
    <MockWindow className="mx-auto w-full max-w-[640px]">
      <div className="flex">
        <div className="min-w-0 flex-1 border-white/[0.06] sm:border-r">
          <div className="flex h-12 items-center gap-1.5 border-b border-white/[0.06] px-3 text-[13px] font-semibold">
            <span className="rounded-md bg-white/10 px-2.5 py-1 text-white">Online</span>
            <span className="text-dim px-2.5 py-1">All</span>
            <span className="text-dim flex items-center gap-1.5 px-2.5 py-1">
              Pending <span className="rounded-full bg-rose-500 px-1.5 text-[10.5px] font-bold text-white">1</span>
            </span>
          </div>
          <div className="space-y-1 p-3">
            <div className="rounded-xl border border-violet-400/40 bg-violet-500/10 p-3">
              <div className="flex items-center gap-3">
                <Avatar person={people.sol} size={36} />
                <div className="leading-tight">
                  <div className="text-[14px] font-semibold text-white">Sol</div>
                  <div className="text-dim text-[12px]">Sent you a friend request</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-500 text-[12.5px] font-bold text-white">
                  <Check size={15} /> Accept
                </span>
                <span className="bg-panel-3 text-dim flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg text-[12.5px] font-bold">
                  <X size={15} /> Decline
                </span>
              </div>
            </div>
            <FriendRow person={people.mira} note="Online" />
            <FriendRow person={people.lena} note="In a voice channel" />
            <FriendRow person={people.juno} note="Idle" />
          </div>
        </div>
        <div className="bg-panel-2/50 hidden w-[250px] shrink-0 flex-col sm:flex">
          <div className="flex h-12 items-center gap-2.5 border-b border-white/[0.06] px-4">
            <Avatar person={people.mira} size={26} showStatus ringClass="ring-panel-2" />
            <span className="text-[14px] font-bold text-white">Mira</span>
          </div>
          <div className="flex-1 space-y-3 p-4 text-[13.5px]">
            <div className="text-mist/90 max-w-[85%] rounded-2xl rounded-tl-md bg-white/[0.07] px-3.5 py-2">Are you joining the lounge tonight?</div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-[linear-gradient(120deg,#7c3aed,#4a6cf7)] px-3.5 py-2 text-white">Yes, give me ten minutes.</div>
          </div>
          <div className="px-3 pb-3">
            <div className="bg-void/70 text-faint flex h-10 items-center rounded-lg px-3 text-[13px]">Message Mira</div>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/* ── 5. Customization and roles ───────────────────────────── */
export function RolesMock() {
  const roles: [string, string, boolean?][] = [
    ["Admin", "bg-violet-400"],
    ["Moderator", "bg-cyan-400", true],
    ["Member", "bg-slate-400"],
  ];
  const perms: [string, boolean][] = [
    ["Send messages", true],
    ["Manage channels", true],
    ["Invite friends", true],
    ["Manage server settings", false],
  ];
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <MockWindow>
        <div className="flex h-12 items-center border-b border-white/[0.06] px-5 text-[14.5px] font-bold text-white">Server settings / Roles</div>
        <div className="flex">
          <div className="bg-ink w-[170px] shrink-0 space-y-1 p-3">
            {roles.map(([name, dot, sel]) => (
              <div key={name} className={cn("flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-semibold", sel ? "bg-white/10 text-white" : "text-dim")}>
                <span className={cn("h-2.5 w-2.5 rounded-full", dot)} />
                {name}
              </div>
            ))}
          </div>
          <div className="min-w-0 flex-1 p-5 pb-28">
            <div className={fieldLabel}>Permissions for Moderator</div>
            <div className="mt-3 divide-y divide-white/[0.06]">
              {perms.map(([label, on]) => (
                <div key={label} className="flex items-center justify-between gap-3 py-3 text-[14px] text-white">
                  {label}
                  <Toggle on={on} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </MockWindow>

      <div className="bg-panel-3 absolute right-3 bottom-[-28px] w-[270px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.65)] sm:right-[-18px]" aria-hidden="true">
        <div className="h-14 bg-[linear-gradient(120deg,#7c3aed,#4a6cf7_60%,#22d3ee)]" />
        <div className="px-4 pb-4">
          <div className="-mt-7">
            <Avatar person={people.nova} size={54} showStatus ringClass="ring-panel-3" />
          </div>
          <div className="mt-2 text-[16px] font-bold text-white">Nova</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <RoleChip role="mod" />
            <RoleChip role="member" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 6. Media sharing ─────────────────────────────────────── */
export function MediaMock() {
  return (
    <MockWindow className="mx-auto w-full max-w-[560px]">
      <div className="flex h-12 items-center gap-2 border-b border-white/[0.06] px-4">
        <Hash size={18} className="text-faint" />
        <span className="text-[14.5px] font-bold text-white">showcase</span>
      </div>
      <div className="py-3">
        <Message person={people.sol} time="10:31">
          Finished the new desk setup.
          <SceneImage className="mt-2.5 aspect-[16/9] w-full max-w-[360px]" />
        </Message>
        <Message person={people.lena} time="10:36">
          Here are my notes from the meetup.
          <div className="mt-2.5">
            <FileAttachment name="meetup-notes.pdf" size="248 KB" />
          </div>
        </Message>
      </div>
      <div className="px-4 pb-4">
        <div className="bg-void/70 flex h-11 items-center gap-3 rounded-xl border border-white/[0.06] px-3.5 text-[13.5px] text-faint">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan/15 text-cyan">
            <Paperclip size={16} />
          </span>
          Message #showcase
          <Smile size={19} className="text-dim ml-auto" />
        </div>
      </div>
    </MockWindow>
  );
}
