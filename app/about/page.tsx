import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import CoreValues from "@/components/about/CoreValues";

export const metadata = {
  title: "About Us | Happy Food",
  description: "Learn more about our mission to bring healthy, delicious food to everyone.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-cream overflow-hidden">
      <AboutHero />
      <OurStory />
      <CoreValues />
    </main>
  );
}
