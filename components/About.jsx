"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Globe, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/ScrollAnimation";

const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 rounded-lg bg-green-100 p-3 dark:bg-green-900/50">
      <Icon className="h-6 w-6 text-green-700 dark:text-green-300" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

const AboutSection = () => {
  const t = useTranslations("AboutSection");

  const values = [
    {
      icon: ShieldCheck,
      title: t("value1_title"),
      description: t("value1_desc"),
    },
    {
      icon: Globe,
      title: t("value2_title"),
      description: t("value2_desc"),
    },
    {
      icon: Users,
      title: t("value3_title"),
      description: t("value3_desc"),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg lg:h-full">
            <Image
              src="/about/about-section.png"
              alt="Tim AgroHarvestani berdiskusi di perkebunan"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="text-center lg:text-left">
            <p className="font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t("description")}
            </p>
            <motion.div
              className="mt-10 space-y-8"
              variants={containerVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
            >
              {values.map((value) => (
                <motion.div key={value.title} variants={itemVariants}>
                  <ValueCard {...value} />
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-12">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Link href="/about">
                  {t("ctaButton")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
