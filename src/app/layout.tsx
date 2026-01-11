import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Portfolio Builder - Create Your Professional Portfolio in Minutes",
  description:
    "Build a stunning, minimal portfolio that stands out. Create your professional portfolio with a custom subdomain, beautiful design, and easy editing. No coding required.",
  keywords: [
    "portfolio",
    "portfolio builder",
    "professional portfolio",
    "developer portfolio",
    "designer portfolio",
    "personal website",
  ],
  authors: [{ name: "Portfolio Builder" }],
  creator: "Portfolio Builder",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.com",
    siteName: "Portfolio Builder",
    title: "Portfolio Builder - Create Your Professional Portfolio in Minutes",
    description:
      "Build a stunning, minimal portfolio that stands out. No coding required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Builder - Create Your Professional Portfolio in Minutes",
    description:
      "Build a stunning, minimal portfolio that stands out. No coding required.",
    images: ["/og-image.png"],
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
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#0a0a0a] text-gray-100 antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#171717",
              border: "1px solid #262626",
              color: "#f5f5f5",
            },
          }}
        />
      </body>
    </html>
  );
}
