"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import SocialSection from "@/components/sections/SocialSection";
import Footer from "@/components/Footer";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import AboutSkeleton from "@/components/skeletons/AboutSkeleton";
import AchievementsSkeleton from "@/components/skeletons/AchievementsSkeleton";
import ProjectsSkeleton from "@/components/skeletons/ProjectsSkeleton";
import SocialSkeleton from "@/components/skeletons/SocialSkeleton";

// Types
interface AboutData {
  bio: string;
  image_url: string;
}

interface EducationData {
  degree: string;
  institution: string;
  year: string;
  image_url?: string;
}

interface Achievement {
  id: string;
  type: string;
  title: string;
  issuer: string;
  date: string;
  image_url?: string;
  credential_link?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_link?: string;
  demo_link?: string;
  image_url?: string;
}

interface CurrentlyLearning {
  items: string[];
}

export default function Home() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [education, setEducation] = useState<EducationData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [learning, setLearning] = useState<CurrentlyLearning | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [excuse, setExcuse] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      try {
        const [aboutData, eduData, achData, projData, learnData, quoteData, excuseData] = await Promise.all([
          fetchAPI("/about"),
          fetchAPI("/education"),
          fetchAPI("/achievements"),
          fetchAPI("/projects"),
          fetchAPI("/currently-learning"),
          fetchAPI("/quotes/daily"),
          fetchAPI("/projects/excuses"),
        ]);
        setAbout(aboutData);
        setEducation(eduData);
        setAchievements(achData.achievements || []);
        setProjects(projData.projects || []);
        setLearning(learnData);
        setQuote(quoteData.quote);
        setExcuse(excuseData.excuse);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    // Clock Logic
    const updateTime = () => {
      const now = new Date();
      const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      setTime(istTime.toLocaleTimeString("en-GB", { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <HomeSkeleton />
        <AboutSkeleton />
        <AchievementsSkeleton />
        <ProjectsSkeleton />
        <SocialSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8">
      <HomeSection about={about} quote={quote} time={time} />
      <AboutSection about={about} learning={learning} />
      <AchievementsSection achievements={achievements} />
      <ProjectsSection projects={projects} excuse={excuse} />
      <SocialSection />
      <Footer />
    </div>
  );
}
