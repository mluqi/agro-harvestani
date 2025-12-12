"use client";

import React, { useState, useEffect, useRef } from "react";
import api from "@/services/api";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Package,
  Award,
  Users,
  Globe,
} from "lucide-react";
import Image from "next/image";

const backendUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.agroharvestani.com";

const COMPANY_STATS = [
  {
    icon: Globe,
    titleKey: "countries",
    descriptionKey: "countries_desc",
  },
  {
    icon: Award,
    titleKey: "years",
    descriptionKey: "years_desc",
  },
  {
    icon: Users,
    titleKey: "farmers",
    descriptionKey: "farmers_desc",
  },
];

const FEATURES = ["feature1", "feature2", "feature3", "feature4", "feature5"];

// Custom Carousel Hook
const useCarousel = (itemsLength, autoplayDelay = 1500) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef(null);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const nextSlide = () => {
    // Gunakan functional update untuk mendapatkan state terbaru
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsLength);
  };

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(nextSlide, autoplayDelay);
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplayDelay, itemsLength]); // Hapus currentIndex dari dependensi

  return { currentIndex, goToSlide };
};

// Sub-components
const TrustBadge = ({ label }) => (
  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
    <Award className="h-4 w-4 text-green-700" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const HeroTitle = ({ title, titleHighlight }) => (
  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
    {title} <span className="text-green-700 block">{titleHighlight}</span>
  </h1>
);

const FeatureList = ({ features, t }) => (
  <div className="mt-8 space-y-3">
    {features.map((feature) => (
      <div key={feature} className="flex items-center gap-3">
        <div className="w-2 h-2 bg-green-700 rounded-full" />
        <span className="text-white/80">{t(feature)}</span>
      </div>
    ))}
  </div>
);

const CTAButtons = ({ ctaButton, sampleButton }) => (
  <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
    <Button
      asChild
      size="lg"
      className="bg-green-800 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold"
    >
      <Link href="/products" className="flex items-center">
        {ctaButton}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
    <Button
      asChild
      size="lg"
      variant="outline"
      className="border-green-700 text-white hover:bg-green-700/20 px-8 py-6 text-lg font-semibold bg-black/20 backdrop-blur-sm"
    >
      <Link
        href="/request-form"
        className="text-white hover:text-green-600 underline-offset-4  font-semibold flex items-center gap-2"
      >
        <Package className="h-5 w-5" />
        {sampleButton}
      </Link>
    </Button>
  </div>
);

const StatCard = ({ Icon, title, description }) => (
  <div className="flex items-center gap-4">
    <div className="p-3 bg-green-800 rounded-lg">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <div className="text-lg font-bold text-green-700">{title}</div>
      <div className="text-white/80 text-sm">{description}</div>
    </div>
  </div>
);

const StatsSection = ({ stats, title, t }) => (
  // Wrapper div dengan padding dan margin untuk mobile, dan reset di desktop (lg)
  <div className="mt-12 lg:mt-0">
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{title}</h3>
      <div className="space-y-4 md:space-y-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.titleKey}
            Icon={stat.icon}
            title={t(stat.titleKey)}
            description={t(stat.descriptionKey)}
          />
        ))}
      </div>
    </div>
  </div>
);

const ScrollIndicator = ({ label }) => (
  <div className="md:absolute bottom-8 left-1/2 -translate-x-1/2">
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm text-white/70">{label}</span>
      <div className="h-10 w-6 rounded-full border-2 border-white/50 flex justify-center items-start p-1">
        <div className="h-2 w-2 rounded-full bg-white animate-bounce" />
      </div>
    </div>
  </div>
);

const BackgroundCarousel = ({ images, currentIndex }) => (
  <div className="absolute inset-0 -z-10 h-full overflow-hidden">
    {images.map((image, index) => (
      <div
        key={index}
        className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: currentIndex === index ? 1 : 0,
          pointerEvents: currentIndex === index ? "auto" : "none",
        }}
      >
        <Image
          src={
            image.image_url
              ? `${backendUrl}/${image.image_url}`
              : "/assets/placeholder.jpeg"
          }
          alt={image.alt_text}
          fill
          className="object-cover object-center"
          priority={index === 0}
          sizes="100vw"
        />
      </div>
    ))}
  </div>
);

// Main Component
const Hero = () => {
  const t = useTranslations("Hero");
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await api.get("/content/hero_images");
        if (response.data && response.data.data.length > 0) {
          setHeroImages(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch hero images:", error);
        // Fallback ke gambar default jika API gagal
        setHeroImages([
          { src: "/hero-images/ladang2.png", alt: "Default hero image" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  const { currentIndex } = useCarousel(heroImages.length, 6000);
  if (loading)
    return (
      <section className="relative flex items-center justify-center h-screen bg-gray-200 dark:bg-gray-800">
        <div>Loading Hero...</div>
      </section>
    );

  return (
    <section className="relative flex items-center py-24 md:py-32 lg:py-33 justify-center text-white overflow-hidden">
      {/* Background */}
      <BackgroundCarousel images={heroImages} currentIndex={currentIndex} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-left">
            <TrustBadge label={t("trusted")} />
            <HeroTitle
              title={t("title")}
              titleHighlight={t("titleHighlight")}
            />

            <p className="mt-6 text-sm md:text-md text-white/90 leading-relaxed max-w-2xl">
              {t("subtitle")}
            </p>

            <FeatureList features={FEATURES} t={t} />
            <CTAButtons
              ctaButton={t("ctaButton")}
              sampleButton={t("sampleButton")}
            />
            {/* Stats Section untuk Mobile - ditampilkan di bawah CTA */}
            <div className="lg:hidden">
              <StatsSection
                stats={COMPANY_STATS}
                title={t("achievements")}
                t={t}
              />
            </div>
          </div>

          {/* Stats Section untuk Desktop - ditampilkan di kolom kedua */}
          <div className="hidden lg:block">
            <StatsSection
              stats={COMPANY_STATS}
              title={t("achievements")}
              t={t}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:block">
        <ScrollIndicator label={t("scroll")} />
      </div>
    </section>
  );
};

export default Hero;
