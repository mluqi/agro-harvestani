"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import api from "@/services/api";
import { toast } from "sonner";

const RequestFormPage = () => {
  const t = useTranslations("RequestFormPage");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purpose, setPurpose] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.post("/submissions", { ...data, purpose, type: "request" });
      toast.success("Request sent successfully!");
      e.target.reset(); // Reset form
      setPurpose("");
    } catch (error) {
      console.error("Failed to send request:", error);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            <div>
              <Label htmlFor="name" className="dark:text-white">
                {t("nameLabel")}
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="dark:text-white">
                {t("emailLabel")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="dark:text-white">
                {t("phoneLabel")}
              </Label>
              <Input id="phone" name="phone" type="tel" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="purpose" className="dark:text-white">
                {t("purposeLabel")}
              </Label>
              <Select required onValueChange={setPurpose} value={purpose}>
                <SelectTrigger id="purpose" className="w-full mt-2">
                  <SelectValue placeholder={t("purposePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">
                    {t("purposeCommercial")}
                  </SelectItem>
                  <SelectItem value="sample">{t("purposeSample")}</SelectItem>
                  <SelectItem value="visit">{t("purposeVisit")}</SelectItem>
                  <SelectItem value="others">{t("purposeOthers")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message" className="dark:text-white">
                {t("messageLabel")}
              </Label>
              <Textarea
                id="message"
                name="message"
                className="mt-2"
                rows={5}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-800 hover:bg-green-700 text-white mt-4"
              size="lg"
            >
              {isSubmitting ? "Sending..." : t("submitButton")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestFormPage;
