import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Sora } from "next/font/google";
import { PageTransitionProvider } from "@/components/layout/PageTransition";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GoDigital | Digital Marketing Agency",
  description:
    "We build brands that people remember. Strategy, creativity, and growth for ambitious businesses.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon1.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${sora.variable} h-full antialiased`}
    >
      
      <body className="min-h-full bg-background text-foreground overflow-x-hidden selection:bg-[#6495ED] selection:text-white">
        <SmoothScroll>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}