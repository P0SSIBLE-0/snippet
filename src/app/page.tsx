import Hero from "@/components/landing/Hero";
import BentoGrid from "@/components/landing/BentoGrid";
import CallToAction from "@/components/landing/CallToAction";

export default function Home() {
  return (
    <main className="grow w-full">
      <Hero />
      <BentoGrid />
      <CallToAction />
    </main>
  );
}
