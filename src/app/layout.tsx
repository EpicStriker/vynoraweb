import type { Metadata, Viewport } from "next";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { siteConfig } from "@/config/site";

const title = "VYNORA: your community, your space";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: title, template: "%s | VYNORA" },
  description: siteConfig.description,
  applicationName: "VYNORA",
  keywords: ["VYNORA", "community platform", "text channels", "voice channels", "servers", "direct messages", "friends"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "VYNORA",
    title,
    description: siteConfig.description,
    url: "/",
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: "VYNORA: connect, chat, play, create" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: ["/brand/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05050d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="bg-violet-deep fixed top-3 left-3 z-[100] -translate-y-20 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
