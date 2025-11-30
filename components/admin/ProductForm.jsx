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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/services/api";

const ProductForm = ({ isOpen, onOpenChange, product, onSave, mode }) => {
  const [formData, setFormData] = useState({
    product_name_en: "",
    product_name_id: "",
    product_desc_en: "",
    product_desc_id: "",
    product_origin_en: "",
    product_origin_id: "",
    product_grade_en: "",
    product_grade_id: "",
    product_package_en: "",
    product_package_id: "",
    product_notes_en: "",
    product_notes_id: "",
    product_category: "",
    product_image: null,
  });
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories for form", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (mode === "edit" && product) {
      setFormData({
        product_name_en: product.product_name_en || "",
        product_name_id: product.product_name_id || "",
        product_category: product.product_category?.toString() || "",
        product_desc_en: product.product_desc_en || "",
        product_desc_id: product.product_desc_id || "",
        product_origin_en: product.product_origin_en || "",
        product_origin_id: product.product_origin_id || "",
        product_grade_en: product.product_grade_en || "",
        product_grade_id: product.product_grade_id || "",
        product_package_en: product.product_package_en || "",
        product_package_id: product.product_package_id || "",
        product_notes_en: product.product_notes_en || "",
        product_notes_id: product.product_notes_id || "",
        product_image: null,
      });
      setPreview(
        product.product_image
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.product_image}`
          : null
      );
    } else {
      setFormData({
        product_name_en: "",
        product_name_id: "",
        product_category: "",
        product_desc_en: "",
        product_desc_id: "",
        product_origin_en: "",
        product_origin_id: "",
        product_grade_en: "",
        product_grade_id: "",
        product_package_en: "",
        product_package_id: "",
        product_notes_en: "",
        product_notes_id: "",
        product_image: null,
      });
      setPreview(null);
    }
  }, [product, mode, isOpen]);

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

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, product_category: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, product_image: file }));
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
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "edit" ? "Edit Produk" : "Tambah Produk Baru"}
            </DialogTitle>
            <DialogDescription>Isi detail untuk produk Anda.</DialogDescription>
          </DialogHeader>
          {preview && (
            <div className="flex justify-center py-4">
              <Image
                src={preview}
                alt="Pratinjau gambar"
                width={96}
                height={96}
                className="rounded-md aspect-square object-cover"
              />
            </div>
          )}
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="id">Indonesia</TabsTrigger>
              </TabsList>
              <TabsContent value="en" className="pt-4 space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product_name_en" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="product_name_en"
                    value={formData.product_name_en}
                    onChange={handleChange}
                    placeholder="Product name"
                    className="col-span-3 placeholder:text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="product_desc_en" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="product_desc_en"
                    value={formData.product_desc_en}
                    onChange={handleChange}
                    placeholder="Product description"
                    className="col-span-3 placeholder:text-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product_origin_en" className="text-right">
                    Origin
                  </Label>
                  <Input
                    id="product_origin_en"
                    value={formData.product_origin_en}
                    onChange={handleChange}
                    className="col-span-3 placeholder:text-sm"
                    placeholder="Product origin"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product_grade_en" className="text-right">
                    Grade
                  </Label>
                  <Input
                    id="product_grade_en"
                    value={formData.product_grade_en}
                    onChange={handleChange}
                    className="col-span-3 placeholder:text-sm"
                    placeholder="Product grade"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product_package_en" className="text-right">
                    Packaging
                  </Label>
                  <Input
                    id="product_package_en"
                    value={formData.product_package_en}
                    onChange={handleChange}
                    className="col-span-3 placeholder:text-sm"
                    placeholder="Product packaging"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="product_notes_en" className="text-right pt-2">Additional Notes</Label>
                  <Textarea id="product_notes_en" value={formData.product_notes_en} onChange={handleChange} placeholder="Additional notes for the product" className="col-span-3 placeholder:text-sm" />
                </div>
              </TabsContent>
              <TabsContent value="id" className="pt-4 space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product_name_id" className="text-right">
                    Nama
                  </Label>
                  <Input
                    id="product_name_id"
                    value={formData.product_name_id}
                    onChange={handleChange}
                    placeholder="Nama produk"
                    className="col-span-3 placeholder:text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="product_desc_id" className="text-right pt-2">
                    Deskripsi
                  </Label>
                  <Textarea
                    id="product_desc_id"
                    value={formData.product_desc_id}
                    onChange={handleChange}
                    placeholder="Deskripsi produk"
                    className="col-span-3 placeholder:text-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product_origin_id" className="text-right">
                    Asal
                  </Label>
                  <Input
                    id="product_origin_id"
                    value={formData.product_origin_id}
                    onChange={handleChange}
                    className="col-span-3 placeholder:text-sm"
                    placeholder="Asal produk"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product_grade_id" className="text-right">
                    Grade
                  </Label>
                  <Input
                    id="product_grade_id"
                    value={formData.product_grade_id}
                    onChange={handleChange}
                    className="col-span-3 placeholder:text-sm"
                    placeholder="Grade produk"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product_package_id" className="text-right">
                    Kemasan
                  </Label>
                  <Input
                    id="product_package_id"
                    value={formData.product_package_id}
                    onChange={handleChange}
                    className="col-span-3 placeholder:text-sm"
                    placeholder="Kemasan produk"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="product_notes_id" className="text-right pt-2">Catatan Tambahan</Label>
                  <Textarea id="product_notes_id" value={formData.product_notes_id} onChange={handleChange} placeholder="Catatan tambahan untuk produk" className="col-span-3 placeholder:text-sm" />
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product_category" className="text-right">
                Kategori
              </Label>
              <Select
                onValueChange={handleCategoryChange}
                value={formData.product_category}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih kategori..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.category_id}
                      value={cat.category_id.toString()}
                    >
                      {cat.category_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product_image" className="text-right">
                Gambar
              </Label>
              <Input
                id="product_image"
                type="file"
                onChange={handleFileChange}
                className="col-span-3 placeholder:text-sm"
              />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
