"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { ThemeToggle } from "../layout/ThemeToggle";
import { LanguageSwitcher } from "../layout/LanguageSwitcher";
import { usePathname } from "next/navigation";
import assets from "../../public/assets/assets";

const Header = () => {
  const pathname = usePathname();
  const isHomePage =
    pathname === "/" || pathname === "/en" || pathname === "/id";

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isHomePage]);

  const isScrolled = !isHomePage || hasScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-gray-200 bg-white/95 shadow-md backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/85"
          : "border-b border-transparent"
      }`}
    >
      <div className="container relative mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={assets.headerLogo}
            alt="AgroHarvestani logo"
            width={200}
            height={200}
          />
        </Link>

        {/* Desktop Nav - Centered */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <Nav isScrolled={isScrolled} />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle isScrolled={isScrolled} />
          {/* Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher isScrolled={isScrolled} />
          </div>
          {/* Mobile Nav */}
          <div className="md:hidden ">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
