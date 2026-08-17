import { Hero } from "@/components/home/Hero";
import { ClientTicker } from "@/components/home/ClientTicker";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { StickyShowcase } from "@/components/home/StickyShowcase";
import { ServiceShowcase } from "@/components/home/ServiceShowcase";
import { Process } from "@/components/home/Process";
import { Results } from "@/components/home/Results";
import { ProjectSlider } from "@/components/home/ProjectSlider";
import { Testimonials } from "@/components/home/Testimonials";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientTicker />
      <FeaturedWork />
      <StickyShowcase />
      <ServiceShowcase />
      <Process />
      <Results />
      <ProjectSlider />
      <Testimonials />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
