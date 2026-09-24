import type { Metadata } from "next";
import LenisProvider from "@/components/LenisProvider";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.proofdeck.app"),
  title: {
    default: "ProofDeck Blog — Digital Credentialing, Verification & Engineering Guides",
    template: "%s | ProofDeck Blog",
  },
  description:
    "Explore practical guides, tutorials, and engineering insights on verifiable digital credentials, fraud prevention, QR code verification, and REST API automation.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" }
    ],
    apple: [
      { url: "/logo.png" }
    ],
  },
  openGraph: {
    siteName: "ProofDeck Blog",
    locale: "en_US",
    type: "website",
    url: "https://blog.proofdeck.app",
    images: [
      {
        url: "https://www.proofdeck.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ProofDeck Digital Credential Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@proofdeck",
    creator: "@proofdeck",
  },
  other: {
    "geo.region": "NG-LA",
    "geo.placename": "Lagos, Nigeria",
    "geo.position": "6.5244;3.3792",
    "ICBM": "6.5244, 3.3792",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-[#5B4CF5] selection:text-white">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
