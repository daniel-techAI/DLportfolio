import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "");
const publicRoot = `${siteUrl}${configuredBasePath ? `/${configuredBasePath}` : ""}`;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(`${publicRoot}/`),
  title: portfolioData.metadata.title,
  description: portfolioData.metadata.description,
  applicationName: portfolioData.metadata.siteName,
  authors: [{ name: portfolioData.identity.name }],
  creator: portfolioData.identity.name,
  keywords: [
    "Daniel Laky",
    "business and economics",
    "AI workflows",
    "web development",
    "digital marketing",
    "analytics",
    "customer support",
    "operations",
    "sales support",
    "Google Shopping ads",
    "Slovakia",
    "remote work",
  ],
  alternates: {
    canonical: `${publicRoot}/`,
  },
  openGraph: {
    type: "profile",
    url: `${publicRoot}/`,
    title: portfolioData.metadata.title,
    description: portfolioData.metadata.description,
    siteName: portfolioData.metadata.siteName,
    locale: portfolioData.metadata.locale,
    images: [
      {
        url: `${publicRoot}${portfolioData.metadata.socialImage.src}`,
        width: portfolioData.metadata.socialImage.width,
        height: portfolioData.metadata.socialImage.height,
        alt: portfolioData.metadata.socialImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.metadata.title,
    description: portfolioData.metadata.description,
    images: [`${publicRoot}${portfolioData.metadata.socialImage.src}`],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0e0f0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
