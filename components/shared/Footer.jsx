"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LeafIcon, MapPin, Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const t = useTranslations("Footer");

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://linkedin.com",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: "https://twitter.com",
    },
  ];

  return (
    <footer className="bg-green-900 text-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <LeafIcon className="h-8 w-8 text-green-700" />
              <span className="text-xl font-bold text-white">
                AgroHarvestani
              </span>
            </Link>
            <p className="text-sm text-green-200 dark:text-gray-400 max-w-xs">
              {t("tagline")}{" "}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-green-200 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-green-200 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-green-200 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("contactUs")}</h3>
            <ul className="space-y-3 text-green-200 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>{t("address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <span>{t("phone")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <span>{t("email")}</span>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("followUs")}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-green-800 pt-8 text-center text-sm text-green-200 dark:border-gray-700 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Agro Harvestani International.{" "}
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
