import type { LucideIcon } from "lucide-react";
import { Headphones, Hash, Image as ImageIcon, MessagesSquare, ShieldCheck, Users } from "lucide-react";
import type { ReactNode } from "react";
import { ChannelsMock, FriendsMock, MediaMock, RolesMock, ServersMock, VoiceMock } from "@/components/mock/FeatureMocks";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

interface Feature {
  id: string;
  title: string;
  text: string;
  icon: LucideIcon;
  glow: string;
  visual: ReactNode;
}

/** Copy comes straight from the product brief; visuals are illustrative mockups. */
const features: Feature[] = [
  {
    id: "servers",
    title: "Community servers",
    text: "Create your own space, invite friends, and build a community around the things you love.",
    icon: Users,
    glow: "from-violet-600/40",
    visual: <ServersMock />,
  },
  {
    id: "text-channels",
    title: "Text channels",
    text: "Keep conversations organized with dedicated channels for different topics.",
    icon: Hash,
    glow: "from-blue-600/40",
    visual: <ChannelsMock />,
  },
  {
    id: "voice",
    title: "Voice channels",
    text: "Join voice conversations and talk to your community in real time.",
    icon: Headphones,
    glow: "from-cyan-500/30",
    visual: <VoiceMock />,
  },
  {
    id: "friends",
    title: "Friends and direct messages",
    text: "Stay connected with friends through private conversations and friend requests.",
    icon: MessagesSquare,
    glow: "from-fuchsia-600/30",
    visual: <FriendsMock />,
  },
  {
    id: "roles",
    title: "Customization and roles",
    text: "Personalize your profile, manage your servers, and organize your community with different roles and permissions.",
    icon: ShieldCheck,
    glow: "from-violet-600/40",
    visual: <RolesMock />,
  },
  {
    id: "media",
    title: "Media sharing",
    text: "Share images and files directly in your conversations.",
    icon: ImageIcon,
    glow: "from-blue-600/40",
    visual: <MediaMock />,
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="relative overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <SectionHeading id="features-title" title="Everything starts with a server.">
          Create a space, invite people in, and shape it around how your community talks.
        </SectionHeading>

        <div className="mt-16 space-y-24 sm:mt-24 sm:space-y-36">
          {features.map((f, i) => {
            const flip = i % 2 === 1;
            const Icon = f.icon;
            return (
              <article key={f.id} id={f.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <Reveal className={cn(flip && "lg:order-2")}>
                  <span className="gradient-border mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-cyan">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-silver text-[clamp(1.4rem,2.6vw,2.1rem)] leading-tight font-semibold">{f.title}</h3>
                  <p className="text-dim mt-4 max-w-[46ch] text-pretty text-base leading-relaxed sm:text-lg">{f.text}</p>
                </Reveal>

                <Reveal delay={0.1} className={cn("relative", flip && "lg:order-1")}>
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -inset-10 -z-10 rounded-full bg-gradient-to-tr to-transparent blur-3xl",
                      f.glow,
                    )}
                  />
                  {f.visual}
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
