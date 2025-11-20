"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { MapPin, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const t = useTranslations("ContactPage");

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 py-36 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("contactInfoTitle")}
            </h2>
            <ul className="space-y-6 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-green-800 flex-shrink-0" />
                <div>
                  <span className="font-semibold block">Address:</span>
                  {t("address")}
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-green-800 flex-shrink-0" />
                <div>
                  <span className="font-semibold block">Phone:</span>
                  <a href={`tel:${t("phone")}`} className="hover:underline">
                    {t("phone")}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-green-800 flex-shrink-0" />
                <div>
                  <span className="font-semibold block">Email:</span>
                  <a href={`mailto:${t("email")}`} className="hover:underline">
                    {t("email")}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("formTitle")}
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("nameLabel")}
                </label>
                <Input type="text" id="name" name="name" required />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("emailLabel")}
                </label>
                <Input type="email" id="email" name="email" required />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("phoneLabel")}
                </label>
                <Input type="tel" id="phone" name="phone" />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("messageLabel")}
                </label>
                <Textarea id="message" name="message" rows="5" required />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-700 text-white"
              >
                {t("submitButton")}
              </Button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t("locationTitle")}
          </h2>
          <div className="relative h-96 w-full rounded-xl overflow-hidden">
            {/* Replace with your actual Google Maps embed code */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.328362090887!2d106.8197793147691!3d-6.21908999549925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e4d9b9d9d9%3A0x123456789abcdef0!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1678901234567!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AgroHarvestani Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
