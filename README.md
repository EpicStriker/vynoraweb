# VYNORA landing page

Marketing website for **VYNORA**, a community communication platform with servers, text channels, voice channels, friends and direct messages.

This site promotes the VYNORA application. It does not contain the application itself.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide icons · self-hosted fonts (Unbounded, Manrope)

---

## 1. Run it

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

---

## 2. Connect it to the real app (do this first)

Every URL lives in one place. Copy the example file and fill it in:

```bash
cp .env.example .env.local
```

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | Target of **Launch VYNORA**, **Get Started** and **Join VYNORA** |
| `NEXT_PUBLIC_LOGIN_URL` | Target of **Login** (defaults to the app URL) |
| `NEXT_PUBLIC_SITE_URL` | Domain this site is deployed on (SEO, sitemap, social cards) |
| `NEXT_PUBLIC_COMMUNITY_URL` | Optional. Shows a "Join our community" link in the footer |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact address in the footer |

Until `NEXT_PUBLIC_APP_URL` is set, the buttons point to `#` and do nothing. No URLs are invented.

The same settings and the FAQ copy are in [`src/config/site.ts`](src/config/site.ts).

---

## 3. Things to review before launch

- **App mockups are illustrative.** The VYNORA HTML application was not available when this site was built, so the interface previews (hero, showcase, feature cards) are modeled on a typical community-chat layout using fictional sample users and servers. Adjust channel names, labels, colors and layout in `src/components/mock/` so they match the real app. Nothing in the copy goes beyond the six features in the brief.
- **FAQ.** Answers stay within the brief. The *"Is VYNORA free to use?"* answer is deliberately non-committal. Replace it in `src/config/site.ts` once pricing and availability are confirmed. Also check that the *"How do I get started?"* steps match the real sign-in flow.
- **Privacy Policy and Terms of Service** (`/privacy`, `/terms`) are placeholder pages with a visible notice. Replace their content with real documents.
- **Contact email** defaults to a clearly fake `contact@your-domain.example`.

---

## 4. Brand assets

Supplied files live in `public/brand/`:

| File | Source |
| --- | --- |
| `mark.png` | Cropped, transparent version of `Vlogo.jpg` (navbar, footer, CTA) |
| `banner.webp` | Optimized `BANNER.png` (About section) |
| `og.png` | 1200×630 crop of the banner for social sharing |
| `loader.gif` | The animated glow, used on the 404 page |
| `src/app/icon.png`, `apple-icon.png` | Favicons from the logo |

To use a higher-quality logo, overwrite `public/brand/mark.png` (transparent PNG, about 512 px wide).

---

## 5. Project structure

```
src/
  app/                 layout, home page, /privacy, /terms, sitemap, robots, 404
  config/site.ts       URLs, nav links, FAQ copy
  components/
    sections/          Navbar, Hero, Features, Showcase, About, Faq, FinalCta, Footer
    mock/              AppPreview (full interface) and FeatureMocks (one per feature)
    ui/                Button, Logo, SectionHeading, Reveal
public/brand/          logo, banner, social image
```

Design tokens (colors, fonts) are in `src/app/globals.css` under `@theme`.

---

## 6. Deploy

**Vercel (simplest):** push the folder to a Git repository, import it at vercel.com, add the environment variables from section 2, deploy.

**Any Node host:** `npm run build && npm run start` (port 3000, set `PORT` to change).

**Static hosting:** add `output: "export"` to `next.config.ts` and set `images: { unoptimized: true }`, run `npm run build`, and upload the `out/` folder.

---

## Accessibility and performance notes

- Respects `prefers-reduced-motion` (all animations are reduced or disabled).
- Visible keyboard focus, skip link, labelled navigation, accessible accordion and menu.
- Decorative mockups are hidden from screen readers; the main previews carry a text description.
- Fonts are self-hosted, images are optimized by `next/image`, and the page is statically generated.
- FAQ content is also published as structured data (JSON-LD) for search engines.
