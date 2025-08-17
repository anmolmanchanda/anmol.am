import { Hero } from "@/components/Hero"
import { FeaturedProjects } from "@/components/FeaturedProjects"
import { SkillsShowcase } from "@/components/SkillsShowcase"
import { InteractiveTimeline } from "@/components/InteractiveTimeline"
import { Testimonials } from "@/components/Testimonials"
import { ServicesSection } from "@/components/ServicesSection"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsShowcase />
      <InteractiveTimeline />
      <Testimonials />
      <ServicesSection />
    </>
  );
}
