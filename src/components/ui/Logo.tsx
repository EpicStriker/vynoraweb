import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

/** The VYNORA mark (from the supplied logo) plus a wide display wordmark. */
export function Logo({ size = 32, showWordmark = true, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/mark.png"
        alt={showWordmark ? "" : "VYNORA"}
        width={size}
        height={Math.round(size * 0.89)}
        className="drop-shadow-[0_0_14px_rgba(99,102,241,0.75)]"
        priority
      />
      {showWordmark && (
        <span className="font-display text-silver text-[1.05rem] font-semibold tracking-[0.06em]">
          VYNORA
        </span>
      )}
    </span>
  );
}
