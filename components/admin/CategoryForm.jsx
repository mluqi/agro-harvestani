"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CategoryForm = ({ isOpen, onOpenChange, category, onSave, mode }) => {
  const [formData, setFormData] = useState({
    category_name: "",
    category_image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (mode === "edit" && category) {
      setFormData({
        category_name: category.category_name || "",
        category_image: null,
      });
      setPreview(
        category.category_image
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${category.category_image}`
          : null
      );
    } else {
      setFormData({
        category_name: "",
        category_image: null,
      });
      setPreview(null);
    }
  }, [category, mode, isOpen]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, category_image: file }));
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSave(formData);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "edit" ? "Edit Kategori" : "Tambah Kategori Baru"}
            </DialogTitle>
            <DialogDescription>
              Isi detail untuk kategori produk Anda.
            </DialogDescription>
          </DialogHeader>
          {preview && (
            <div className="flex justify-center py-4">
              <Image
                src={preview}
                alt="Pratinjau gambar kategori"
                width={96}
                height={96}
                className="rounded-md aspect-square object-cover"
              />
            </div>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category_name" className="text-right">
                Nama
              </Label>
              <Input
                id="category_name"
                value={formData.category_name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category_image" className="text-right">
                Gambar
              </Label>
              <Input
                id="category_image"
                type="file"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
