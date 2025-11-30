"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/services/api";

// Objek terjemahan sederhana untuk header
const translations = {
  en: {
    title: "Our Latest Articles",
    subtitle:
      "Insights, stories, and updates from the world of Indonesian agriculture.",
  },
  id: {
    title: "Artikel Terbaru Kami",
    subtitle: "Wawasan, cerita, dan pembaruan dari dunia pertanian Indonesia.",
  },
};

// Komponen untuk satu kartu blog
const BlogCard = ({ post }) => (
  <Link href={`/blogs/${post.slug}`} legacyBehavior>
    <a className="block overflow-hidden rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={
            post.featured_image
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${post.featured_image}`
              : "https://placehold.co/600x400/2E7D32/FFFFFF?text=Article"
          }
          alt={post.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span>By {post.author?.user_name || "Admin"}</span> &bull;{" "}
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </a>
  </Link>
);

const BlogsPage = ({ params: { locale } }) => {
  // Pilih terjemahan yang sesuai, default ke bahasa Inggris jika tidak ditemukan
  const t = translations[locale] || translations.en;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // Mengambil artikel yang sudah 'published' dan sesuai dengan locale
        const response = await api.get("/blogs", {
          params: { locale },
        });
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [locale]);

  return (
    <>
      {/* Header Section */}
      <section className="bg-gray-50 dark:bg-gray-900/50 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t.subtitle}
          </p>
        </div>
      </section>
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center text-gray-500">Loading articles...</div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No articles found for this language.
          </div>
        )}
      </main>
    </>
  );
};

export default BlogsPage;
