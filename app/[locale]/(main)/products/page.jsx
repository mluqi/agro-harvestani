"use client";

import React, { useState, useMemo, useEffect, use } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import api from "@/services/api";

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

const ProductCard = ({ image, title, description, category }) => (
  <div className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg h-full flex flex-col">
    <div className="relative h-64 w-full">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-sm font-semibold uppercase tracking-wider text-green-800 dark:text-green-700">
        {category}
      </p>
      <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400 flex-grow">
        {description}
      </p>
    </div>
  </div>
);

const ProductsPage = ({ params }) => {
  const { locale } = use(params);
  const t = useTranslations("ProductsPage");
  const [activeFilter, setActiveFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories and products concurrently
        const [catResponse, prodResponse] = await Promise.all([
          api.get("/categories", { params: { locale } }),
          api.get("/products", { params: { locale } }),
        ]);
        setCategories(catResponse.data);
        setProducts(prodResponse.data);
      } catch (error) {
        console.error("Failed to fetch data for products page:", error);
        toast.error("Gagal memuat data produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") {
      return products;
    }
    // Filter based on the slug of the category name
    return products.filter(
      (product) => slugify(product.Category?.category_name) === activeFilter
    );
  }, [activeFilter, products]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <main>
      {/* Header Section */}
      <section className="bg-gray-50 dark:bg-gray-900/50 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              key="all"
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
              className={`capitalize ${
                activeFilter === "all"
                  ? "bg-green-800 hover:bg-green-700 text-white"
                  : "dark:text-white"
              }`}
            >
              {t(`filter_all`)}
            </Button>
            {categories.map((category) => (
              <Button
                key={category.category_id}
                variant={
                  activeFilter === slugify(category.category_name)
                    ? "default"
                    : "outline"
                }
                onClick={() => setActiveFilter(slugify(category.category_name))}
                className={`capitalize ${
                  activeFilter === slugify(category.category_name)
                    ? "bg-green-800 hover:bg-green-700 text-white"
                    : "dark:text-white"
                }`}
              >
                {category.category_name}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <p className="col-span-3 text-center">Memuat produk...</p>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product.product_id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <Link
                      href={`/products/${product.product_slug}`}
                      className="h-full block"
                    >
                      <ProductCard
                        image={
                          product.product_image
                            ? `${backend_url}/${product.product_image}`
                            : "/assets/placeholder.jpeg"
                        }
                        title={product.product_name}
                        description={product.product_desc}
                        category={
                          product.Category?.category_name || "Uncategorized"
                        }
                      />
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-500 dark:text-gray-400">
                  <p>Belum ada produk untuk kategori ini.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
