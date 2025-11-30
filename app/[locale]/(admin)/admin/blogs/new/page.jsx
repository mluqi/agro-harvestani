"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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

const NewBlogPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState("draft");
  const [locale, setLocale] = useState("id");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await api.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Artikel berhasil dibuat!");
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Failed to create blog post:", error);
      toast.error(error.response?.data?.message || "Gagal membuat artikel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Buat Artikel Baru</CardTitle>
          <CardDescription>
            Isi detail di bawah ini untuk membuat artikel blog baru.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Judul Artikel</Label>
            <Input
              id="title"
              placeholder="Judul artikel Anda..."
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
              placeholder="Ringkasan singkat artikel..."
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
                  <SelectValue placeholder="Pilih status" />
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
                  <SelectValue placeholder="Pilih bahasa" />
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
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/blogs")}
            className="mr-2"
          >
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan Artikel"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default NewBlogPage;
