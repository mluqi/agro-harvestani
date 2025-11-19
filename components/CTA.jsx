"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  const t = useTranslations("CTA");

  return (
    <section className="relative py-20 sm:py-28">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/cta-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-green-900/80 dark:bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center text-white">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-green-100 dark:text-gray-300">
          {t("description")}
        </p>
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="bg-white text-green-700 hover:bg-gray-200 dark:bg-green-500 dark:text-white dark:hover:bg-green-600 px-8 py-6 text-lg font-semibold"
          >
            <Link href="/contact">
              {t("ctaButton")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
