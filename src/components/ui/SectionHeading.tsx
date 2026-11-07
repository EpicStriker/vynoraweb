import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Shared heading block: one headline, one supporting paragraph. */
export function SectionHeading({ id, title, children, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <h2
        id={id}
        className="font-display text-silver text-balance text-[clamp(1.6rem,4.2vw,3rem)] leading-[1.12] font-semibold"
      >
        {title}
      </h2>
      {children && (
        <p
          className={cn(
            "text-dim mt-5 max-w-[60ch] text-pretty text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {children}
        </p>
      )}
    </div>
  );
}
