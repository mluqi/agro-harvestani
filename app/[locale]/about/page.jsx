"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/ScrollAnimation";
import { Eye, Target, Gem, ShieldCheck, Sprout } from "lucide-react";
import CTA from "@/components/CTA";

const TeamMemberCard = ({ name, title, imageSrc }) => (
  <div className="text-center">
    <div className="relative h-48 w-48 mx-auto mb-4 overflow-hidden rounded-full shadow-lg">
      <Image
        src={imageSrc}
        alt={name}
        fill
        className="object-cover"
        sizes="192px"
      />
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
    <p className="text-green-800 dark:text-green-700">{title}</p>
  </div>
);

const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
    <div className="mb-4 flex-shrink-0 rounded-full bg-green-100 p-4 dark:bg-green-900/50">
      <Icon className="h-8 w-8 text-green-700 dark:text-green-300" />
    </div>
    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const AboutPage = () => {
  const t = useTranslations("AboutPage");

  const teamMembers = [
    {
      name: t("team1_name"),
      title: t("team1_title"),
      imageSrc: "/team/john.jpg",
    },
    {
      name: t("team2_name"),
      title: t("team2_title"),
      imageSrc: "/team/jane.jpg",
    },
    {
      name: t("team3_name"),
      title: t("team3_title"),
      imageSrc: "/team/john.jpg",
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: t("value1_title"),
      description: t("value1_desc"),
    },
    { icon: Gem, title: t("value2_title"), description: t("value2_desc") },
    { icon: Sprout, title: t("value3_title"), description: t("value3_desc") },
  ];

  return (
    <>
      <main>
        {/* Header Section */}
        <section className="bg-gray-50 dark:bg-gray-900/50 pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg lg:h-[450px]">
                <Image
                  src="/about/story.png"
                  alt="A handshake deal in a lush green field"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  {t("storyTitle")}
                </h2>
                <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                  {t("storyContent_p1")}
                </p>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  {t("storyContent_p2")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Eye className="h-10 w-10 text-green-800" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t("visionTitle")}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t("visionContent")}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Target className="h-10 w-10 text-green-800" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t("missionTitle")}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t("missionContent")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t("valuesTitle")}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                {t("valuesSubtitle")}
              </p>
            </div>
            <motion.div
              className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              {values.map((value) => (
                <motion.div key={value.title} variants={itemVariants}>
                  <ValueCard {...value} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t("teamTitle")}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                {t("teamSubtitle")}
              </p>
            </div>
            <motion.div
              className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              {teamMembers.map((member) => (
                <motion.div key={member.name} variants={itemVariants}>
                  <TeamMemberCard {...member} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <CTA />
    </>
  );
};

export default AboutPage;
