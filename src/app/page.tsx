import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] w-full relative flex flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />

      <CTA />
      <Footer />
    </main>
  );
}
