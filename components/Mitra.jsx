"use client";

import React, { useState, useEffect } from "react";
import api from "@/services/api";
import { useTranslations } from "next-intl";
import Image from "next/image";

const backendUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.agroharvestani.com";

const Mitra = () => {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  useEffect(() => {
    const fetchMitraLogos = async () => {
      try {
        const response = await api.get("/content/mitra_logos");
        if (response.data && response.data.data) {
          setPartners(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch partner logos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMitraLogos();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setOffset((prevOffset) => prevOffset - 1);
    }, 20); // Update every 20ms for smooth animation

    return () => clearInterval(interval);
  }, [isPaused, partners.length]);

  // Reset offset when it reaches the end
  useEffect(() => {
    // Lebar setiap item logo sekitar 160px di desktop
    if (partners.length > 0 && offset <= -(partners.length * 160)) {
      setOffset(0);
    }
  }, [offset, partners.length]);

  const t = useTranslations("Mitra");

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-gray-900 py-16 text-center">
        Loading partners...
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 py-16 sm:py-24 px-4 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        {/* Logo Slider */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex items-center gap-1 md:gap-8"
            style={{
              transform: `translateX(${offset}px)`,
              transition: "none",
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-24 md:w-32"
              >
                <div className="w-24 h-12 md:w-32 md:h-16 flex items-center justify-center group relative">
                  <Image
                    src={`${backendUrl}/${partner.image_url}`}
                    alt={partner.alt_text || "Partner Logo"}
                    fill
                    className="max-w-full rounded-xl max-h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 dark:opacity-40 dark:hover:opacity-90 transition-all duration-300 group-hover:filter group-hover:brightness-95"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays - Modified for red-white theme */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none transition-colors duration-300"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none transition-colors duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Mitra;
