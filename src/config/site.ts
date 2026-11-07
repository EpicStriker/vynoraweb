/**
 * ─────────────────────────────────────────────────────────────
 *  VYNORA site configuration
 * ─────────────────────────────────────────────────────────────
 *  Everything you need to connect this marketing site to the
 *  real application lives here (or in .env.local).
 *
 *  Values marked PLACEHOLDER are NOT real. Replace them before
 *  launching. Nothing in this file is an invented URL: if you do
 *  not set a value, the site shows an obvious placeholder.
 * ─────────────────────────────────────────────────────────────
 */

const env = (value: string | undefined, fallback: string) =>
  value && value.trim().length > 0 ? value.trim() : fallback;

/** PLACEHOLDER: set NEXT_PUBLIC_APP_URL to the real VYNORA application URL. */
const APP_URL = env(process.env.NEXT_PUBLIC_APP_URL, "#");

export const siteConfig = {
  name: "VYNORA",
  tagline: "Connect, chat, play, create.",
  description:
    "VYNORA brings your friends, communities and conversations together with text channels, voice channels and shared servers.",

  /** PLACEHOLDER: set NEXT_PUBLIC_SITE_URL to the domain this site is deployed on. */
  siteUrl: env(process.env.NEXT_PUBLIC_SITE_URL, "https://your-domain.example"),

  /** Where every "Launch / Get Started / Join" button goes. */
  appUrl: APP_URL,

  /** PLACEHOLDER: defaults to the app URL until a dedicated login URL is set. */
  loginUrl: env(process.env.NEXT_PUBLIC_LOGIN_URL, APP_URL),

  /** Optional. When empty, the community link is hidden in the footer. */
  communityUrl: env(process.env.NEXT_PUBLIC_COMMUNITY_URL, ""),

  /** PLACEHOLDER: replace with a real inbox. */
  contactEmail: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "contact@your-domain.example"),

  /** True while the app URL has not been configured yet. */
  get appUrlIsPlaceholder() {
    return APP_URL === "#";
  },
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
] as const;

/**
 * FAQ copy.
 * Only statements supported by the product brief are used here.
 * Anything about pricing or availability is deliberately left open:
 * edit the "free to use" answer once the facts are confirmed.
 */
export const faqItems = [
  {
    q: "What is VYNORA?",
    a: "VYNORA is a community communication platform. It brings messaging, voice channels and shared servers together, so friends and communities can stay connected in one place.",
  },
  {
    q: "How do I get started?",
    a: "Select Get Started to open VYNORA, log in, and then join a server or create your own. Add your friends and start talking in text or voice channels.",
  },
  {
    q: "Can I create my own server?",
    a: "Yes. You can create your own server, invite friends and build a community around the things you love. You decide how it is organized with channels, roles and permissions.",
  },
  {
    q: "Does VYNORA support voice communication?",
    a: "Yes. Voice channels let you join a conversation and talk to your community in real time, alongside the text channels in the same server.",
  },
  {
    q: "Can I add friends?",
    a: "Yes. Send friend requests, accept the ones you receive, and keep in touch through private direct messages.",
  },
  {
    q: "Is VYNORA free to use?",
    // TODO: replace with the confirmed pricing / availability statement.
    a: "Pricing and availability details have not been published on this site yet. For the latest information, open the VYNORA application or get in touch through the contact details in the footer.",
  },
] as const;
