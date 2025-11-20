"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Nav = ({ isScrolled }) => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("products"), href: "/products" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <nav>
      <ul className="flex items-center gap-8">
        {navLinks.map((link) => {
          // Logika baru untuk tautan aktif
          // 1. Jika href adalah '/', cek apakah pathname adalah '/' atau '/en' atau '/id'
          // 2. Untuk href lain, cek apakah pathname diakhiri dengan href tersebut
          const isActive =
            link.href === "/"
              ? pathname === "/" || pathname === "/en" || pathname === "/id"
              : pathname.endsWith(link.href);

          const scrolledClasses = isActive
            ? "text-green-800 dark:text-green-700 font-semibold"
            : "text-gray-600 hover:text-green-800 dark:text-gray-300 dark:hover:text-green-700";

          const topClasses = isActive
            ? "text-white font-semibold"
            : "text-white/80 hover:text-white";

          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`text-base font-medium transition-colors duration-300 px-3 py-2 rounded-md ${
                  isScrolled ? scrolledClasses : topClasses
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
