import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function FinalCta() {
  return (
    <section id="join" aria-labelledby="cta-title" className="relative px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="gradient-border relative mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-center sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="stars absolute inset-0 opacity-80" />
          <div className="animate-drift-a absolute -top-32 left-[8%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.55),transparent_65%)] blur-3xl" />
          <div className="animate-drift-b absolute -right-24 -bottom-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.35),transparent_65%)] blur-3xl" />
        </div>

        <div className="relative">
          <Image
            src="/brand/mark.png"
            alt=""
            width={88}
            height={78}
            className="mx-auto mb-8 drop-shadow-[0_0_34px_rgba(99,102,241,0.9)]"
          />
          <h2
            id="cta-title"
            className="font-display text-silver mx-auto max-w-[18ch] text-balance text-[clamp(1.7rem,4.8vw,3.5rem)] leading-[1.1] font-semibold"
          >
            Your Next Community Starts Here.
          </h2>
          <p className="text-dim mx-auto mt-6 max-w-[44ch] text-pretty text-base sm:text-lg">
            Connect, communicate, and create something together with VYNORA.
          </p>
          <div className="mt-10">
            <Button href={siteConfig.appUrl} size="lg">
              Join VYNORA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
