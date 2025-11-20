"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("products"), href: "/products" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Buka menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-full flex-col bg-white dark:bg-gray-900"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Menu Navigasi</SheetTitle>
          <SheetDescription>
            Daftar tautan untuk navigasi utama situs.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link) => {
              // Logika baru untuk tautan aktif
              const isActive =
                link.href === "/"
                  ? pathname === "/" || pathname === "/en" || pathname === "/id"
                  : pathname.endsWith(link.href);

              return (
                <li key={link.name}>
                  <SheetTrigger asChild>
                    <Link
                      href={link.href}
                      className={`text-2xl font-semibold transition-colors hover:text-green-800 dark:hover:text-green-700 ${
                        isActive
                          ? "text-green-800 dark:text-green-700"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </SheetTrigger>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <ThemeToggle isScrolled={true} />
              <LanguageSwitcher isScrolled={true} />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
