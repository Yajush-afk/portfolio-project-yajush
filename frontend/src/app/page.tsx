"use client";

import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import SocialSection from "@/components/sections/SocialSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8">
      <HomeSection />
      <AboutSection />
      <AchievementsSection />
      <ProjectsSection />
      <SocialSection />
      <Footer />
    </div>
  );
}
