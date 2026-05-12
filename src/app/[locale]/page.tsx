import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/Hero/HeroSection";
import AboutSection from "@/components/sections/About/AboutSection";
import ExpertiseSection from "@/components/sections/Expertise/ExpertiseSection";
import ExperienceSection from "@/components/sections/Experience/ExperienceSection";
import ProjectsSection from "@/components/sections/Projects/ProjectsSection";
import SkillsSection from "@/components/sections/Skills/SkillsSection";
import ContactSection from "@/components/sections/Contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
