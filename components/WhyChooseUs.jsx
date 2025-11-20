"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Gem, Sprout, Ship, Handshake, icons } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/ScrollAnimation";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
    <div className="mb-4 flex-shrink-0 rounded-full bg-green-100 p-4 dark:bg-green-900/50">
      <Icon className="h-8 w-8 text-green-700 dark:text-green-300" />
    </div>
    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const WhyChooseUs = () => {
  const t = useTranslations("WhyChooseUs");

  const features = [
    {
      icon: Gem,
      title: t("feature1_title"),
      description: t("feature1_desc"),
    },
    {
      icon: Sprout,
      title: t("feature2_title"),
      description: t("feature2_desc"),
    },
    {
      icon: Ship,
      title: t("feature3_title"),
      description: t("feature3_desc"),
    },
    {
      icon: Handshake,
      title: t("feature4_title"),
      description: t("feature4_desc"),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-wider text-green-800 dark:text-green-700">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
