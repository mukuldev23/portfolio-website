import type { Metadata, Viewport } from "next";
import { Nunito, Share_Tech_Mono, Special_Elite } from "next/font/google";
import Shell from "@/components/Shell";
import { profile } from "@/data/site";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });
const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono", display: "swap" });
const elite = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-elite", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.roles[0]}`,
  description: `${profile.name} — ${profile.roles[0]}. ${profile.tagline}`,
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Applies the saved theme before first paint so night mode doesn't flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="night"||t==="day")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="day"
      className={`${nunito.variable} ${mono.variable} ${elite.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
