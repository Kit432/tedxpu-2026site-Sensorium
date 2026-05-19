import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "@/components/misc/ScrollToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://tedxpanteionuniversity.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "TEDxPanteion University",
  title: {
    default: "Sensorium | TEDxPanteion University 2026",
    template: "%s | TEDxPanteion University",
  },
  description:
    "TEDxPanteion University 2026 presents Sensorium, an event exploring perception, the senses, technology, society, science, and culture.",
  keywords: [
    "TEDxPanteion University",
    "TEDxPU",
    "TEDx",
    "Panteion University",
    "Sensorium",
    "TEDx 2026",
    "Athens events",
  ],
  authors: [{ name: "TEDxPanteion University" }],
  creator: "TEDxPanteion University",
  publisher: "TEDxPanteion University",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Sensorium | TEDxPanteion University 2026",
    description:
      "Explore Sensorium, the 2026 TEDxPanteion University event about how we sense, perceive, and connect with the world.",
    url: "/",
    siteName: "TEDxPanteion University",
    images: [
      {
        url: "/assets/events/2026.avif",
        width: 2500,
        height: 1309,
        alt: "Sensorium TEDxPanteion University 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sensorium | TEDxPanteion University 2026",
    description:
      "Explore Sensorium, the 2026 TEDxPanteion University event about senses, perception, and human experience.",
    images: ["/assets/events/2026.avif"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
