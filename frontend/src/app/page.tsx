"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/api";
import { FiArrowRight, FiAward, FiBook, FiCode } from "react-icons/fi";

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

export default function Home() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [education, setEducation] = useState<EducationData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [aboutData, eduData, achData] = await Promise.all([
          fetchAPI("/about"),
          fetchAPI("/education"),
          fetchAPI("/achievements"),
        ]);
        setAbout(aboutData);
        setEducation(eduData);
        setAchievements(achData.achievements || []);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-20 pb-20">
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
          {about?.image_url && (
            <Image
              src={`http://localhost:8000${about.image_url}`}
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          )}
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
