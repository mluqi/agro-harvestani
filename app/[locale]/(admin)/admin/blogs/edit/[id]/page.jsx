"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import api from "@/services/api";
import "react-quill-new/dist/quill.snow.css"; // Import CSS untuk react-quill

// Muat ReactQuill secara dinamis hanya di sisi klien
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

const EditBlogPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState("draft");
  const [locale, setLocale] = useState("id");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await api.get(`/blogs/manage/${id}`);
      const blog = response.data.data;
      setTitle(blog.title);
      setContent(blog.content);
      setExcerpt(blog.excerpt || "");
      setStatus(blog.status);
      setLocale(blog.locale);
      if (blog.featured_image) {
        setPreview(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.featured_image}`
        );
      }
    } catch (error) {
      console.error("Failed to fetch blog data:", error);
      toast.error("Gagal memuat data artikel.");
      router.push("/admin/blogs");
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("status", status);
    formData.append("locale", locale);
    if (featuredImage) {
      formData.append("featured_image", featuredImage);
    }

    try {
      // Backend route untuk update adalah PUT /blogs/:id
      await api.put(`/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Artikel berhasil diperbarui!");
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Failed to update blog post:", error);
      toast.error(
        error.response?.data?.message || "Gagal memperbarui artikel."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8">Memuat data artikel...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Artikel</CardTitle>
          <CardDescription>
            Perbarui detail artikel blog di bawah ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Judul Artikel</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Konten</Label>
            {/* Ganti Textarea dengan ReactQuill */}
            <div className="bg-white rounded-md">
              <ReactQuill theme="snow" value={content} onChange={setContent} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="excerpt">Ringkasan (Excerpt)</Label>
            <Textarea
              id="excerpt"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="locale">Bahasa</Label>
              <Select value={locale} onValueChange={setLocale}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Indonesia (ID)</SelectItem>
                  <SelectItem value="en">English (EN)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="featured_image">Gambar Utama</Label>
            <Input
              id="featured_image"
              type="file"
              onChange={handleFileChange}
            />
            {preview && (
              <div className="mt-4">
                <Image
                  src={preview}
                  alt="Pratinjau gambar"
                  width={200}
                  height={100}
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default EditBlogPage;
