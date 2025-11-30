"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/ScrollAnimation";
import api from "@/services/api";
import { Button } from "./ui/button";

const backend_url =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Helper function to generate a URL-friendly slug from a category name
const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const CategoryCard = ({ image, title, href, ctaText }) => (
  <div className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
    <Link href={href} className="block">
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <div className="mt-1 inline-flex items-center text-sm font-semibold text-green-300">
            {ctaText}
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const OurProducts = () => {
  const t = useTranslations();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        // Ambil 8 kategori pertama untuk ditampilkan di homepage
        setCategories(response.data.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch categories for homepage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        {/* Top: Title and Description */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-green-800 dark:text-green-700">
            {t("OurProducts.eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t("OurProducts.title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t("OurProducts.description")}
          </p>
        </div>

        {/* Bottom: Category Cards */}
        {!loading && categories.length > 0 && (
          <motion.div
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
          >
            {categories.map((category) => (
              <motion.div key={category.category_id} variants={itemVariants}>
                <CategoryCard
                  image={
                    category.category_image
                      ? `${backend_url}/${category.category_image}`
                      : "/assets/placeholder.jpeg"
                  }
                  title={category.category_name}
                  href={`/products?category=${slugify(category.category_name)}`}
                  ctaText={t("OurProducts.card_cta")}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA Button */}
        <div className="mt-16 text-center">
          <Button
            asChild
            size="lg"
            className="bg-green-800 hover:bg-green-700 text-white px-8"
          >
            <Link href="/products">{t("OurProducts.mainCtaButton")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;