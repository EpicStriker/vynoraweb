import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/config/site";
import { isExternal } from "@/lib/cn";

const linkClass = "text-dim hover:text-white transition-colors text-[15px]";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.07] bg-void">
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
        <div>
          <Logo size={36} />
          <p className="text-dim mt-5 max-w-[36ch] text-[15px] leading-relaxed">
            VYNORA brings friends, communities and conversations together with messaging, voice channels and shared servers.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-sm font-semibold text-white">Explore</h2>
          <ul className="mt-4 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={siteConfig.loginUrl} className={linkClass}>
                Login
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold text-white">Legal</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href="/privacy" className={linkClass}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className={linkClass}>
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-3">
            <li>
              {/* PLACEHOLDER address: set NEXT_PUBLIC_CONTACT_EMAIL */}
              <a href={`mailto:${siteConfig.contactEmail}`} className={linkClass}>
                {siteConfig.contactEmail}
              </a>
            </li>
            {siteConfig.communityUrl && (
              <li>
                <a
                  href={siteConfig.communityUrl}
                  className={linkClass}
                  {...(isExternal(siteConfig.communityUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  Join our community
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="text-faint mx-auto flex w-full max-w-[1240px] flex-col gap-2 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>&copy; {year} VYNORA. All rights reserved.</span>
          <span>{siteConfig.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
