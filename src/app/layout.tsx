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

export const metadata: Metadata = {
  title: "Sensorium | TEDx Panteion University",
  description: "TEDx Panteion University Sensorium one-page experience.",
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
