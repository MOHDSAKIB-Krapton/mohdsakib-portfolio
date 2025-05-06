import AboutSection from "@/components/crafted/about/page";
import HeroSection from "@/components/crafted/hero/hero";
import SkillsSection from "@/components/crafted/skills/page";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
    </div>
  );
};

export default Home;
