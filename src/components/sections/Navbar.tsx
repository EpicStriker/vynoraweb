"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Highlight the link of the section currently in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-500 ease-out",
          scrolled
            ? "glass-nav mt-3 max-w-[1040px] rounded-full px-4 py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] sm:px-5"
            : "mt-0 max-w-[1240px] rounded-full border border-transparent px-1 py-5 sm:px-2",
          open && "max-md:rounded-3xl",
        )}
      >
        <a href="#home" aria-label="VYNORA home" className="rounded-full">
          <Logo size={34} />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isActive ? "text-white" : "text-dim hover:text-white",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button href={siteConfig.loginUrl} variant="ghost">
            Login
          </Button>
          <Button href={siteConfig.appUrl}>Launch VYNORA</Button>
        </div>

        <button
          type="button"
          className="text-mist flex h-10 w-10 items-center justify-center rounded-full bg-white/5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-nav mx-auto mt-2 max-w-[1040px] rounded-3xl p-3 md:hidden"
            style={{ background: "#0a0a1a" }}
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-mist block rounded-2xl px-4 py-3 text-base font-semibold hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2 p-1">
              <Button href={siteConfig.loginUrl} variant="secondary" onClick={() => setOpen(false)}>
                Login
              </Button>
              <Button href={siteConfig.appUrl} onClick={() => setOpen(false)}>
                Launch VYNORA
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
