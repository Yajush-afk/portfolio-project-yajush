"use client";

import { motion } from "framer-motion";
import { FiAward, FiBriefcase } from "react-icons/fi";
import Image from "next/image";

interface Achievement {
  id: string;
  type: string;
  title: string;
  issuer: string;
  date: string;
  image_url?: string;
  credential_link?: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementCard = ({ ach, index }: { ach: Achievement; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
  >
    <div className="relative h-48 w-full bg-secondary/50 overflow-hidden">
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
    <div className="p-5 space-y-3 flex-1 flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          {ach.type}
        </span>
        <span className="text-xs text-muted-foreground">{ach.date}</span>
      </div>
      <h3 className="font-semibold line-clamp-2 flex-1" title={ach.title}>
        {ach.title}
      </h3>
      <p className="text-sm text-muted-foreground">{ach.issuer}</p>
      {ach.type === "certificate" && ach.credential_link && (
        <a
          href={ach.credential_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-primary hover:underline pt-2 mt-auto"
        >
          View Credential
        </a>
      )}
    </div>
  </motion.div>
);

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const certifications = achievements.filter((ach) => ach.type === "certificate");
  const proofOfWork = achievements.filter((ach) => ach.type !== "certificate");

  return (
    <section id="achievements" className="min-h-screen flex flex-col justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4 mb-16 text-center"
      >
        <h2 className="text-3xl font-bold inline-flex items-center gap-3">
          Achievements
        </h2>
      </motion.div>

      <div className="space-y-20">
        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-border flex-1 max-w-[100px]" />
              <h3 className="text-xl font-semibold flex items-center gap-2 text-muted-foreground">
                <FiAward className="text-primary" /> Certifications
              </h3>
              <div className="h-px bg-border flex-1 max-w-[100px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {certifications.map((ach, index) => (
                <div key={ach.id} className="w-full max-w-sm">
                   <AchievementCard ach={ach} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proof of Work */}
        {proofOfWork.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-border flex-1 max-w-[100px]" />
              <h3 className="text-xl font-semibold flex items-center gap-2 text-muted-foreground">
                <FiBriefcase className="text-primary" /> Proof of Work
              </h3>
              <div className="h-px bg-border flex-1 max-w-[100px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {proofOfWork.map((ach, index) => (
                <div key={ach.id} className="w-full max-w-sm">
                  <AchievementCard ach={ach} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
