import { Hero } from "@/components/Hero"
import { FeaturedProjects } from "@/components/FeaturedProjects"
import { SkillsShowcase } from "@/components/SkillsShowcase"
import { InteractiveTimeline } from "@/components/InteractiveTimeline"
// import { Testimonials } from "@/components/Testimonials"  // Hidden for now
import { ServicesSection } from "@/components/ServicesSection"

export default function Home() {
  return (
    <div className="relative min-h-screen aurora-bg">
      <Hero />
      <FeaturedProjects />
      <SkillsShowcase />
      <InteractiveTimeline />
      {/* <Testimonials /> */}  {/* Hidden until real testimonials are ready */}
      <ServicesSection />
    </div>
  );
}
