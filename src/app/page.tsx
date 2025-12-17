import Hero from "@/components/landing/Hero";
import BentoGrid from "@/components/landing/BentoGrid";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Snippets - Save your code snippets",
  description: "Save your code snippets",

}

export default function Home() {
  return (
    <main className="grow w-full">
      <Hero />
      <BentoGrid />
      <CallToAction />
      {/* <Footer /> */}
    </main>
  );
}
