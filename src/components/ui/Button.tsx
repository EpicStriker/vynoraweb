import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternal } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 will-change-transform active:scale-[0.98]";

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-13 px-8 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(110deg,#7c3aed_0%,#4a6cf7_55%,#22b8e8_100%)] shadow-[0_8px_30px_-6px_rgba(99,102,241,0.7),inset_0_1px_0_rgba(255,255,255,0.28)] hover:shadow-[0_12px_44px_-4px_rgba(99,102,241,0.95),0_0_0_1px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.35)] hover:-translate-y-0.5",
  secondary:
    "text-mist glass hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5",
  ghost: "text-dim hover:text-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (isExternal(href)) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  // Internal pages (/privacy) use the Next router; hash links and "#" use a plain anchor.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  );
}
