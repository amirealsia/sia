import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Am I Real Sia - AI Idol Daily NFT Project",
  description: "A 365-day AI art project featuring SIA, a 20-year-old digital character who questions her own existence. Daily photorealistic portraits from Seoul.",
  keywords: ["AI art", "NFT", "Solana", "digital art", "AI idol", "photorealistic", "daily NFT"],
  authors: [{ name: "Am I Real Sia Project" }],
  openGraph: {
    title: "Am I Real Sia - AI Idol Daily NFT Project",
    description: "Am I real, or just AI? Daily photorealistic AI portraits exploring existence and identity.",
    url: "https://amirealsia.com",
    siteName: "Am I Real Sia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Am I Real Sia - AI Idol Daily NFT Project",
    description: "Am I real, or just AI? Daily photorealistic AI portraits.",
    creator: "@amirealsia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
