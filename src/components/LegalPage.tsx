import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/sections/Footer";
import { Logo } from "@/components/ui/Logo";

/** Shell for the Privacy Policy and Terms of Service pages. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <header className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" aria-label="VYNORA home">
          <Logo size={34} />
        </Link>
        <Link href="/" className="text-dim text-sm font-semibold hover:text-white">
          Back to home
        </Link>
      </header>
      <main id="main" className="mx-auto max-w-[760px] px-5 pt-10 pb-24 sm:px-8">
        <h1 className="font-display text-silver text-[clamp(1.8rem,4.5vw,2.8rem)] leading-tight font-semibold">{title}</h1>
        {/* PLACEHOLDER notice: remove once the real document is in place */}
        <p className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm leading-relaxed text-amber-100">
          This page is a placeholder. Replace its content with your real {title.toLowerCase()} before launching.
        </p>
        <div className="text-dim mt-10 space-y-5 text-base leading-relaxed">{children}</div>
      </main>
      <Footer />
    </>
  );
}
