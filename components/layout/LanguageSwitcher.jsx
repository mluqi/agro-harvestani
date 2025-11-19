"use client";

import React, { useState, useRef, useEffect } from "react";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher({ isScrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Menutup dropdown ketika klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (locale) => {
    changeLocale(locale);
    setIsOpen(false); // Tutup dropdown setelah memilih bahasa
  };

  const changeLocale = (locale) => {
    router.replace(
      `/${locale}${
        pathname.startsWith("/en") || pathname.startsWith("/id")
          ? pathname.substring(3)
          : pathname
      }`
    );
  };

  const iconClasses = isScrolled
    ? "text-gray-600 dark:text-gray-300"
    : "text-white";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-transparent hover:text-gray-400 h-10 w-10 cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Languages className={`h-[1.2rem] w-[1.2rem] ${iconClasses}`} />
        <span className="sr-only">Ganti bahasa</span>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <button
            onClick={() => handleLocaleChange("en")}
            className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground"
            role="menuitem"
          >
            English
          </button>
          <button
            onClick={() => handleLocaleChange("id")}
            className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground"
            role="menuitem"
          >
            Indonesia
          </button>
        </div>
      )}
    </div>
  );
}
