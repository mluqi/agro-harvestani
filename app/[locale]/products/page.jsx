"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getAllProducts, productCategories } from "@/data/allProducts";
import Link from "next/link";

const ProductCard = ({ image, title, description, category }) => (
  <div className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg h-full flex flex-col">
    <div className="relative h-56 w-full">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
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

const ProductsPage = () => {
  const t = useTranslations("ProductsPage");
  const [activeFilter, setActiveFilter] = useState("all");

  const allProducts = useMemo(() => getAllProducts(t), [t]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") {
      return allProducts;
    }
    return allProducts.filter((product) => product.category === activeFilter);
  }, [activeFilter, allProducts]);

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
            {productCategories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={`capitalize ${
                  activeFilter === category
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "dark:text-white"
                }`}
              >
                {t(`filter_${category}`)}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <Link href={`/products/${product.id}`} className="h-full">
                    <ProductCard
                      {...product}
                      category={t(`filter_${product.category}`)}
                    />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
