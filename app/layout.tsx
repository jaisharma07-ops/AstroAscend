import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { AuroraBg } from "@/components/aurora-bg";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AstroAscend — The Knowledge Realm",
    template: "%s · AstroAscend",
  },
  description:
    "AstroAscend is an educational platform dedicated to providing comprehensive and innovative learning experiences.",
  metadataBase: new URL("https://astroascend.example"),
  openGraph: {
    title: "AstroAscend — The Knowledge Realm",
    description:
      "AstroAscend is an educational platform dedicated to providing comprehensive and innovative learning experiences.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <AuroraBg />
          <LenisProvider />
          <a
            href="#main"
            className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:text-fg focus:shadow-lg"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
