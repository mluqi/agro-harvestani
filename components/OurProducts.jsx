"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/ScrollAnimation";
import { Button } from "./ui/button";
import { getFeaturedProducts } from "@/data/products";

const ProductCard = ({ image, category, title, href, ctaText }) => (
  <div className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
    <div className="relative h-56 w-full">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-green-800 dark:text-green-700">
        {category}
      </p>
      <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <Link
        href={href}
        className="mt-4 inline-flex items-center font-semibold text-green-700 dark:text-green-300 transition-colors hover:text-green-900 dark:hover:text-green-100"
      >
        {ctaText}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
);

const OurProducts = () => {
  const t = useTranslations("OurProducts");
  const products = getFeaturedProducts(t);

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Title and Description */}
          <div className="text-center lg:text-left">
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

          {/* Right Side: Product Cards */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={containerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard {...product} ctaText={t("card_cta")} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-16 text-center">
          <Button
            asChild
            size="lg"
            className="bg-green-800 hover:bg-green-700 text-white px-8"
          >
            <Link href="/products">{t("mainCtaButton")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
