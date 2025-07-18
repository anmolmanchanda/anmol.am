import { Hero } from "@/components/Hero"
import { FeaturedProjects } from "@/components/FeaturedProjects"
import { SkillsShowcase } from "@/components/SkillsShowcase"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsShowcase />
    </>
  );
}
