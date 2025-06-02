import AboutSection from "@/components/crafted/about/page";
import ContactFSMSection from "@/components/crafted/contact/page";
import CSConceptsSection from "@/components/crafted/cs-concept/page";
import GitHubShowcase from "@/components/crafted/github/page";
import HeroSection from "@/components/crafted/hero/hero";
import ProjectsSection from "@/components/crafted/projects/page";
import SkillsSection from "@/components/crafted/skills/page";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <GitHubShowcase />
      <CSConceptsSection />
      <ContactFSMSection />
      <ProjectsSection />
    </div>
  );
};

export default Home;
