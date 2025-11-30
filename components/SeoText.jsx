"use client";

import React from "react";
import { useTranslations } from "next-intl";

const SeoText = () => {
  const t = useTranslations("SeoBlock");

  return (
    <section className="relative py-12 md:py-32 bg-white dark:bg-gray-900">
      {/* Background to match CTA */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/cta-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-white dark:bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-xl font-bold text-green-900/80 dark:text-white mb-4">{t("title")}</h2>
        <p className="leading-relaxed text-sm text-green-900/80 dark:text-gray-300">
          {t("description")}
        </p>
      </div>
    </section>
  );
};

export default SeoText;
