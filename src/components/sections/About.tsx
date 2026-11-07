import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    title: "Organized communities",
    text: "Servers, channels and roles keep every group tidy, from a small circle of friends to a larger community.",
  },
  {
    title: "Real-time messaging",
    text: "Text channels and direct messages keep conversations moving, with images and files shared right in the thread.",
  },
  {
    title: "Voice and friendships",
    text: "Jump into a voice channel, add friends and stay in touch whenever you like.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading id="about-title" title="Built for Communities. Designed for Connection.">
            VYNORA brings people together through organized communities, real-time messaging, voice communication, and
            friendships.
          </SectionHeading>

          <dl className="mt-10 space-y-6">
            {points.map((p) => (
              <div key={p.title} className="border-l-2 border-transparent pl-5 [border-image:linear-gradient(180deg,#8b5cf6,#22d3ee)_1]">
                <dt className="font-display text-[1.02rem] font-semibold text-white">{p.title}</dt>
                <dd className="text-dim mt-1.5 max-w-[48ch] text-[15px] leading-relaxed">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.4),transparent_68%)] blur-3xl"
          />
          <div className="gradient-border panel-shadow overflow-hidden rounded-[24px]">
            <Image
              src="/brand/banner.webp"
              alt="VYNORA banner: text chat, voice channels, communities and more. Connect, chat, play, create."
              width={1983}
              height={793}
              sizes="(min-width: 1024px) 640px, 92vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
