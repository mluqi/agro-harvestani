"use client";

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

const BlogDetailClient = ({ post }) => {
  // Jika post tidak ada (diterima sebagai null dari server), tampilkan 404
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-24 lg:py-30">
      <article>
        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-5xl">
          {post.title}
        </h1>
        <div className="mb-6 text-gray-500 dark:text-gray-400">
          <span>By {post.author?.user_name || "Admin"}</span> &bull;{" "}
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
          <Image
            src={
              post.featured_image
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${post.featured_image}`
                : "https://placehold.co/1200x600/2E7D32/FFFFFF?text=Article"
            }
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
};

export default BlogDetailClient;
