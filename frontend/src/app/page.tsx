"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/api";
import { FiArrowRight, FiAward, FiBook, FiCode, FiClock, FiTerminal, FiMusic, FiSearch } from "react-icons/fi";
import { 
  SiHtml5, SiCss3, SiPython, SiCplusplus, SiFastapi, SiDjango, SiFlask, 
  SiMysql, SiPostgresql, SiScikitlearn, SiTensorflow, SiPytorch, 
  SiKaggle, SiGooglecolab, SiUbuntu, SiBrave, SiSpotify, SiGithub
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

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

const techStack = [
  { category: "Frontend", items: [
    { name: "HTML5", icon: SiHtml5, url: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "hover:text-orange-500" },
    { name: "CSS3", icon: SiCss3, url: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "hover:text-blue-500" }
  ]},
  { category: "Backend", items: [
    { name: "Python", icon: SiPython, url: "https://www.python.org/", color: "hover:text-yellow-400" },
    { name: "C++", icon: SiCplusplus, url: "https://isocpp.org/", color: "hover:text-blue-600" }
  ]},
  { category: "Frameworks", items: [
    { name: "FastAPI", icon: SiFastapi, url: "https://fastapi.tiangolo.com/", color: "hover:text-teal-400" },
    { name: "Django", icon: SiDjango, url: "https://www.djangoproject.com/", color: "hover:text-green-600" },
    { name: "Flask", icon: SiFlask, url: "https://flask.palletsprojects.com/", color: "hover:text-gray-400" }
  ]},
  { category: "Database", items: [
    { name: "MySQL", icon: SiMysql, url: "https://www.mysql.com/", color: "hover:text-blue-400" },
    { name: "PostgreSQL", icon: SiPostgresql, url: "https://www.postgresql.org/", color: "hover:text-blue-300" }
  ]},
  { category: "Data Science", items: [
    { name: "Scikit-learn", icon: SiScikitlearn, url: "https://scikit-learn.org/", color: "hover:text-orange-400" },
    { name: "TensorFlow", icon: SiTensorflow, url: "https://www.tensorflow.org/", color: "hover:text-orange-500" },
    { name: "PyTorch", icon: SiPytorch, url: "https://pytorch.org/", color: "hover:text-red-500" }
  ]},
  { category: "Platforms", items: [
    { name: "VS Code", icon: VscVscode, url: "https://code.visualstudio.com/", color: "hover:text-blue-500" },
    { name: "Kaggle", icon: SiKaggle, url: "https://www.kaggle.com/", color: "hover:text-blue-400" },
    { name: "Colab", icon: SiGooglecolab, url: "https://colab.research.google.com/", color: "hover:text-orange-400" }
  ]}
];

const toolkit = [
  { name: "VS Code", icon: VscVscode, url: "https://code.visualstudio.com/", color: "text-blue-500" },
  { name: "Terminal", icon: SiUbuntu, url: "https://ubuntu.com/", color: "text-orange-500" },
  { name: "Brave", icon: SiBrave, url: "https://brave.com/", color: "text-orange-600" },
  { name: "Spotify", icon: SiSpotify, url: "https://open.spotify.com/", color: "text-green-500" },
  { name: "Perplexity", icon: FiSearch, url: "https://www.perplexity.ai/", color: "text-teal-400" }, // Using generic search icon as proxy
  { name: "GitHub", icon: SiGithub, url: "https://github.com/", color: "text-foreground" }
];

export default function Home() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [education, setEducation] = useState<EducationData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      try {
        const [aboutData, eduData, achData, quoteData] = await Promise.all([
          fetchAPI("/about"),
          fetchAPI("/education"),
          fetchAPI("/achievements"),
          fetchAPI("/quotes/daily"),
        ]);
        setAbout(aboutData);
        setEducation(eduData);
        setAchievements(achData.achievements || []);
        setQuote(quoteData.quote);
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 md:gap-20 pt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I'm <span className="text-primary">Yajush</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {about?.bio || "Loading bio..."}
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View Projects <FiCode />
            </Link>
            <Link
              href="/social"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              Connect <FiArrowRight />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-secondary shadow-2xl"
        >
          {about?.image_url && <Image
            src={`http://localhost:8000${about.image_url}`}
            alt="Profile"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            unoptimized
          />}
        </motion.div>
      </section>

      {/* Quote & Clock Row */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 bg-secondary/20 border border-border rounded-2xl p-6 flex flex-col justify-center text-center md:text-left"
        >
          <blockquote className="text-lg md:text-xl font-medium italic text-muted-foreground/90">
            "{quote}"
          </blockquote>
          <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest opacity-70">— Quote of the Day —</p>
        </motion.div>

        {/* Clock */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-2 shadow-sm"
        >
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
            <FiClock /> IST (India)
          </div>
          <div className="text-4xl font-mono font-bold text-primary tracking-widest">
            {time}
          </div>
        </motion.div>
      </section>

      {/* Tech Stack & Toolkit Row */}
      <section className="grid lg:grid-cols-3 gap-8">
        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-6"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiCode className="text-primary" /> Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techStack.map((stack) => (
              <div key={stack.category} className="bg-card/50 border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">{stack.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {stack.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-2xl transition-transform hover:scale-110 ${item.color}`}
                      title={item.name}
                    >
                      <item.icon />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Toolkit (Dock Style) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col h-full"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <FiTerminal className="text-primary" /> My Toolkit
          </h2>
          <div className="flex-1 bg-secondary/30 border border-border rounded-2xl p-6 flex items-center justify-center">
             <div className="bg-background/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl flex gap-4 shadow-2xl">
                {toolkit.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center gap-2"
                  >
                    <div className={`text-3xl transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 ${tool.color}`}>
                      <tool.icon />
                    </div>
                    <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-medium bg-foreground text-background px-2 py-0.5 rounded whitespace-nowrap pointer-events-none">
                      {tool.name}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-2" />
                  </a>
                ))}
             </div>
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section className="space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold flex items-center gap-3"
        >
          <FiBook className="text-primary" /> Education
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{education?.degree}</h3>
              <p className="text-muted-foreground">{education?.institution}</p>
            </div>
            <span className="px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium w-fit">
              {education?.year}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section className="space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold flex items-center gap-3"
        >
          <FiAward className="text-primary" /> Achievements
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, index) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative h-48 w-full bg-secondary/50">
                {ach.image_url ? (
                  <Image
                    src={`http://localhost:8000${ach.image_url}`}
                    alt={ach.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <FiAward size={40} />
                  </div>
                )}
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {ach.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{ach.date}</span>
                </div>
                <h3 className="font-semibold line-clamp-2" title={ach.title}>
                  {ach.title}
                </h3>
                <p className="text-sm text-muted-foreground">{ach.issuer}</p>
                {ach.credential_link && (
                  <a
                    href={ach.credential_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-primary hover:underline pt-2"
                  >
                    View Credential
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
