"use client";

import React, { useState, useEffect, useCallback } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, PlusCircle, Upload, AlertCircle } from "lucide-react";
import Image from "next/image";

const backendUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.agroharvestani.com";

const ContentManagementPage = () => {
  // State untuk data, loading, dan error
  const [heroImages, setHeroImages] = useState([]);
  const [mitraLogos, setMitraLogos] = useState([]);
  const [deletedHeroIds, setDeletedHeroIds] = useState([]);
  const [deletedMitraIds, setDeletedMitraIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({ hero: false, mitra: false });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // Fetch data awal
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/content/admin/all");
      const data = response.data.data;
      if (data.hero_image) {
        setHeroImages(
          data.hero_image.map((img) => ({ ...img, file: null, preview: null }))
        );
      }
      if (data.mitra_logo) {
        setMitraLogos(
          data.mitra_logo.map((logo) => ({
            ...logo,
            file: null,
            preview: null,
          }))
        );
      }
    } catch (err) {
      setError("Gagal memuat data konten. Silakan coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showSuccessMessage = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  // Handlers untuk Hero Images
  const handleHeroChange = (index, field, value) => {
    const newImages = [...heroImages];
    newImages[index][field] = value;
    setHeroImages(newImages);
  };

  const handleHeroFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...heroImages];
      newImages[index].file = file;
      newImages[index].preview = URL.createObjectURL(file);
      setHeroImages(newImages);
    }
  };

  const handleAddHeroImage = () => {
    if (heroImages.length >= 5) {
      setError("Anda hanya dapat menambahkan maksimal 5 gambar hero.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    setHeroImages([
      ...heroImages,
      {
        id: `new-${Date.now()}`,
        alt_text: "",
        display_order: heroImages.length + 1,
        image_url: "",
        file: null,
        preview: null,
        is_new: true,
      },
    ]);
  };

  const handleDeleteHeroImage = (index) => {
    const imageToDelete = heroImages[index];
    if (imageToDelete.id && !imageToDelete.is_new) {
      setDeletedHeroIds([...deletedHeroIds, imageToDelete.id]);
    }
    setHeroImages(heroImages.filter((_, i) => i !== index));
  };

  const handleSaveHeroImages = async () => {
    setSaving((prev) => ({ ...prev, hero: true }));
    setError(null);
    const formData = new FormData();

    const imagesToUpdate = heroImages.map((img) => ({
      id: img.is_new ? undefined : img.id,
      alt_text: img.alt_text,
      display_order: img.display_order,
      is_new: img.is_new || false,
    }));
    heroImages.forEach((img) => {
      if (img.is_new && img.file) {
        formData.append("images", img.file);
      }
    });
    formData.append("images", JSON.stringify(imagesToUpdate));
    formData.append("deleted_ids", JSON.stringify(deletedHeroIds));

    try {
      await api.post("/content/admin/hero-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showSuccessMessage("Gambar hero berhasil disimpan!");
      setDeletedHeroIds([]);
      fetchData(); // Refresh data
    } catch (err) {
      setError("Gagal menyimpan gambar hero.");
      console.error(err);
    } finally {
      setSaving((prev) => ({ ...prev, hero: false }));
    }
  };

  // Handlers untuk Mitra Logos (tidak berubah)
  const handleMitraChange = (index, field, value) => {
    const newLogos = [...mitraLogos];
    newLogos[index][field] = value;
    setMitraLogos(newLogos);
  };

  const handleMitraFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newLogos = [...mitraLogos];
      newLogos[index].file = file;
      newLogos[index].preview = URL.createObjectURL(file);
      setMitraLogos(newLogos);
    }
  };

  const handleAddMitra = () => {
    setMitraLogos([
      ...mitraLogos,
      {
        id: `new-${Date.now()}`,
        alt_text: "",
        display_order: mitraLogos.length + 1,
        image_url: "",
        file: null,
        preview: null,
        is_new: true,
      },
    ]);
  };

  const handleDeleteMitra = (index) => {
    const logoToDelete = mitraLogos[index];
    if (logoToDelete.id && !logoToDelete.is_new) {
      setDeletedMitraIds([...deletedMitraIds, logoToDelete.id]);
    }
    setMitraLogos(mitraLogos.filter((_, i) => i !== index));
  };

  const handleSaveMitraLogos = async () => {
    setSaving((prev) => ({ ...prev, mitra: true }));
    setError(null);
    const formData = new FormData();

    const logosToUpdate = mitraLogos.map((logo) => ({
      id: logo.is_new ? undefined : logo.id,
      alt_text: logo.alt_text,
      display_order: logo.display_order,
      is_new: logo.is_new || false,
    }));

    mitraLogos.forEach((logo) => {
      if (logo.is_new && logo.file) {
        formData.append("images", logo.file);
      }
    });

    formData.append("logos", JSON.stringify(logosToUpdate));
    formData.append("deleted_ids", JSON.stringify(deletedMitraIds));

    try {
      await api.post("/content/admin/mitra-logos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showSuccessMessage("Logo mitra berhasil disimpan!");
      setDeletedMitraIds([]);
      fetchData(); // Refresh data
    } catch (err) {
      setError("Gagal menyimpan logo mitra.");
      console.error(err);
    } finally {
      setSaving((prev) => ({ ...prev, mitra: false }));
    }
  };

  if (loading) return <div>Memuat data...</div>;

  return (
    <div className="container overflow-y-auto mx-auto p-4 md:p-6 space-y-8">
      <h1 className="text-2xl font-bold">Manajemen Konten Halaman</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-md flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-100 text-green-700 border border-green-300 rounded-md">
          {success}
        </div>
      )}

      {/* Card untuk Hero Component */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gambar Hero Carousel (Maks. 5)</CardTitle>
          <Button
            variant="outline"
            onClick={handleAddHeroImage}
            disabled={heroImages.length >= 5}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Gambar
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {heroImages.map((image, index) => (
              <div
                key={image.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-md"
              >
                <Image
                  src={
                    image.preview ||
                    (image.image_url
                      ? `${backendUrl}/${image.image_url}`
                      : "/assets/placeholder.jpeg")
                  }
                  alt={image.alt_text || "Preview Gambar Hero"}
                  width={150}
                  height={80}
                  className="object-cover border rounded-md bg-gray-100"
                />
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div className="space-y-1">
                    <Label htmlFor={`hero-alt-${index}`}>Alt Text</Label>
                    <Input
                      id={`hero-alt-${index}`}
                      value={image.alt_text || ""}
                      onChange={(e) =>
                        handleHeroChange(index, "alt_text", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`hero-order-${index}`}>Urutan</Label>
                    <Input
                      id={`hero-order-${index}`}
                      type="number"
                      value={image.display_order || ""}
                      onChange={(e) =>
                        handleHeroChange(
                          index,
                          "display_order",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </div>
                </div>
                {image.is_new && (
                  <div className="w-full md:w-auto">
                    <Label htmlFor={`hero-file-${index}`} className="sr-only">
                      Upload
                    </Label>
                    <Input
                      id={`hero-file-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleHeroFileChange(index, e)}
                    />
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteHeroImage(index)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Hapus</span>
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={handleSaveHeroImages} disabled={saving.hero}>
            {saving.hero ? "Menyimpan..." : "Simpan Gambar Hero"}
          </Button>
        </CardContent>
      </Card>

      {/* Card untuk Logo Mitra */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Logo Mitra</CardTitle>
          <Button variant="outline" onClick={handleAddMitra}>
            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Logo Mitra
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {mitraLogos.map((logo, index) => (
              <div
                key={logo.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-md"
              >
                <Image
                  src={
                    logo.preview ||
                    (logo.image_url
                      ? `${backendUrl}/${logo.image_url}`
                      : "/assets/placeholder.jpeg")
                  }
                  alt={logo.alt_text || "Preview Logo Mitra"}
                  width={120}
                  height={50}
                  className="object-contain border rounded-md bg-gray-100"
                />
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div className="space-y-1">
                    <Label htmlFor={`mitra-alt-${index}`}>Alt Text</Label>
                    <Input
                      id={`mitra-alt-${index}`}
                      value={logo.alt_text || ""}
                      onChange={(e) =>
                        handleMitraChange(index, "alt_text", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`mitra-order-${index}`}>Urutan</Label>
                    <Input
                      id={`mitra-order-${index}`}
                      type="number"
                      value={logo.display_order || ""}
                      onChange={(e) =>
                        handleMitraChange(
                          index,
                          "display_order",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </div>
                </div>
                {logo.is_new && (
                  <div className="w-full md:w-auto">
                    <Label htmlFor={`mitra-file-${index}`} className="sr-only">
                      Upload
                    </Label>
                    <Input
                      id={`mitra-file-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMitraFileChange(index, e)}
                    />
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteMitra(index)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Hapus</span>
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={handleSaveMitraLogos} disabled={saving.mitra}>
            {saving.mitra ? "Menyimpan..." : "Simpan Semua Perubahan Mitra"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagementPage;
