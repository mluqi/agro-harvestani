"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const TestimonialCard = ({ quote, name, company, avatar }) => (
  <Card className="flex h-full flex-col justify-between border-2">
    <CardContent className="p-6">
      <Quote className="h-8 w-8 text-green-500 dark:text-green-400" />
      <blockquote className="mt-4 flex-grow text-lg text-gray-700 dark:text-gray-300">
        "{quote}"
      </blockquote>
    </CardContent>
    <CardFooter className="flex items-center gap-4 p-6 pt-0">
      <Avatar className="h-14 w-14">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-bold text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>
        <div className="mt-1 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
    </CardFooter>
  </Card>
);

const Testimonials = () => {
  const t = useTranslations("Testimonials");

  const testimonials = [
    {
      quote: t("testimonial1_quote"),
      name: t("testimonial1_name"),
      company: t("testimonial1_company"),
      avatar: "/avatars/avatar-1.jpg",
    },
    {
      quote: t("testimonial2_quote"),
      name: t("testimonial2_name"),
      company: t("testimonial2_company"),
      avatar: "/avatars/avatar-2.jpg",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto mt-16 w-full max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <TestimonialCard {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
