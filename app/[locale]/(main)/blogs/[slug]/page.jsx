import React from "react";
import { notFound } from "next/navigation";
import BlogDetailClient from "@/components/blogs/BlogDetailClient";

// Fungsi untuk mengambil data satu artikel dari backend (berjalan di server)
async function getBlogData(slug) {
  try {
    // Menggunakan fetch karena ini berjalan di server
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${slug}`,
      { next: { revalidate: 600 } } // Cache selama 10 menit
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch blog data:", error);
    return null;
  }
}

// Fungsi untuk generate metadata dinamis
export async function generateMetadata({ params }) {
  const post = await getBlogData(params.slug);

  if (!post) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.featured_image
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${post.featured_image}`
            : `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`, // Fallback image
        },
      ],
    },
  };
}

const BlogDetailPage = async ({ params }) => {
  const post = await getBlogData(params.slug);

  // Kirim data post ke komponen klien untuk ditampilkan
  return <BlogDetailClient post={post} />;
};

export default BlogDetailPage;
