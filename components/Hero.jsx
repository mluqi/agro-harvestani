"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Play, Award, Users, Globe } from "lucide-react";
import Image from "next/image";

// Constants
const HERO_IMAGES = [
  {
    src: "/hero-images/ladang2.png",
    alt: "Lahan pertanian yang luas dan subur",
  },
  {
    src: "/hero-images/ladang.png",
    alt: "Petani memegang hasil panen segar berkualitas ekspor",
  },
  {
    src: "/hero-images/shipping.png",
    alt: "Kontainer kargo di pelabuhan siap untuk ekspor global",
  },
  {
    src: "/hero-images/biji.png",
    alt: "Proses inspeksi dan jaminan kualitas produk pertanian",
  },
];

const COMPANY_STATS = [
  {
    icon: Globe,
    titleKey: "countries",
    description: "Adhering to international quality and safety protocols.",
  },
  {
    icon: Award,
    titleKey: "years",
    description: "Multi-stage quality control from farm to port.",
  },
  {
    icon: Users,
    titleKey: "farmers",
    description:
      "Building fair and sustainable partnerships with local growers.",
  },
];

const FEATURES = ["feature1", "feature2", "feature3"];

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
    <Award className="h-4 w-4 text-green-400" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const HeroTitle = ({ title, titleHighlight }) => (
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
    {title}
    <span className="text-green-400 block">{titleHighlight}</span>
  </h1>
);

const FeatureList = ({ features, t }) => (
  <div className="mt-8 space-y-3">
    {features.map((feature) => (
      <div key={feature} className="flex items-center gap-3">
        <div className="w-2 h-2 bg-green-400 rounded-full" />
        <span className="text-white/80">{t(feature)}</span>
      </div>
    ))}
  </div>
);

const CTAButtons = ({ ctaButton, aboutButton }) => (
  <div className="mt-10 flex flex-col sm:flex-row gap-4">
    <Button
      asChild
      size="lg"
      className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold"
    >
      <Link href="/products">
        {ctaButton}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>

    <Button
      asChild
      size="lg"
      variant="outline"
      className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold bg-transparent"
    >
      <Link href="/about" className="flex items-center">
        <Play className="mr-2 h-5 w-5" />
        {aboutButton}
      </Link>
    </Button>
  </div>
);

const StatCard = ({ Icon, title, description }) => (
  <div className="flex items-center gap-4">
    <div className="p-3 bg-green-600 rounded-lg">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <div className="text-lg font-bold text-green-400">{title}</div>
      <div className="text-white/80 text-sm">{description}</div>
    </div>
  </div>
);

const StatsSection = ({ stats, title, t }) => (
  <div className="hidden lg:block">
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            Icon={stat.icon}
            title={t(stat.titleKey)}
            description={stat.description}
          />
        ))}
      </div>
    </div>
  </div>
);

const ScrollIndicator = ({ label }) => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
          src={image.src}
          alt={image.alt}
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
  const { currentIndex } = useCarousel(HERO_IMAGES.length, 6000);

  return (
    <section className="relative flex items-center py-24 md:py-32 lg:py-54 justify-center text-white overflow-hidden">
      {/* Background */}
      <BackgroundCarousel images={HERO_IMAGES} currentIndex={currentIndex} />

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

            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
              {t("subtitle")}
            </p>

            <FeatureList features={FEATURES} t={t} />
            <CTAButtons
              ctaButton={t("ctaButton")}
              aboutButton={t("aboutButton")}
            />
          </div>

          {/* Stats Section */}
          <StatsSection stats={COMPANY_STATS} title={t("achievements")} t={t} />
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
