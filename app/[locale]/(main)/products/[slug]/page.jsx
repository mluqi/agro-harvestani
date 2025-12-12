"use client";

import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import api from "@/services/api";

const backend_url =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.agroharvestani.com";

const SpecificationItem = ({ label, value }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 py-3 flex justify-between">
    <dt className="text-gray-600 dark:text-gray-400">{label}</dt>
    <dd className="font-semibold text-gray-900 dark:text-white text-right text-wrap">
      {value}
    </dd>
  </div>
);

export default function ProductDetailPage({ params }) {
  const { slug, locale } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/slug/${slug}`, {
          params: { locale },
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        setProduct(null); // Set product to null on error
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [slug, locale]);

  // Handle loading state
  if (loading) {
    return (
      <main className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="container mx-auto px-4 text-center">
          <p>Loading product details...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    notFound();
  }

  const specifications = [
    { label: "Origin", value: product.product_origin },
    { label: "Grade", value: product.product_grade },
    { label: "Packaging", value: product.product_package },
  ];

  return (
    <main className="pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-green-800 hover:text-green-800 dark:text-green-700 dark:hover:text-green-200 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg sm:h-96 lg:h-full">
            <Image
              src={
                product.product_image
                  ? `${backend_url}/${product.product_image}`
                  : "/assets/placeholder.jpeg"
              }
              alt={product.product_name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Details */}
          <div>
            <p className="font-semibold uppercase tracking-wider text-green-800 dark:text-green-700">
              {product.Category?.category_name || "Uncategorized"}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {product.product_name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {product.product_desc}
            </p>

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Specifications
              </h2>
              <dl className="mt-4 space-y-2">
                {specifications
                  .filter((spec) => spec.value) // Only show specs that have a value
                  .map((spec) => (
                    <SpecificationItem
                      key={spec.label}
                      label={spec.label}
                      value={spec.value}
                    />
                  ))}
              </dl>
            </div>

            {product.product_notes && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Additional Notes
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {product.product_notes}
                </p>
              </div>
            )}

            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-green-800 hover:bg-green-700 text-white px-8 py-6 text-lg"
              >
                <Link href="/request-form">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
