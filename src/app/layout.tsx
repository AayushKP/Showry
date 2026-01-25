import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Cormorant_Garamond,
  Instrument_Serif,
} from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Profiled | Build Your Professional Portfolio",
  description:
    "Create a stunning, minimal portfolio that stands out. Get your own subdomain, beautiful design, and easy editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${playfair.variable} ${cormorant.variable} ${instrumentSerif.variable} min-h-screen bg-[#050505] font-sans antialiased selection:bg-amber-500/30 selection:text-amber-500`}
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
