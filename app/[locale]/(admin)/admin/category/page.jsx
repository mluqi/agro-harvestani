"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import api from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import CategoryForm from "@/components/admin/CategoryForm";

const backend_url =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.agroharvestani.com";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Gagal memuat daftar kategori.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setModalMode("edit");
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = async (formData) => {
    try {
      const data = new FormData();
      data.append("category_name", formData.category_name);
      if (formData.category_image) {
        data.append("category_image", formData.category_image);
      }

      if (modalMode === "edit") {
        await api.put(`/categories/${editingCategory.category_id}`, data);
        toast.success("Kategori berhasil diperbarui.");
      } else {
        await api.post("/categories", data);
        toast.success("Kategori baru berhasil ditambahkan.");
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Terjadi kesalahan.";
      toast.error(errorMessage);
      console.error(err);
    }
  };

  const promptDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await api.delete(`/categories/${categoryToDelete.category_id}`);
      toast.success(
        `Kategori "${categoryToDelete.category_name}" berhasil dihapus.`
      );
      fetchCategories();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Gagal menghapus kategori.";
      toast.error(errorMessage);
      console.error("Error deleting category:", err);
    } finally {
      setCategoryToDelete(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manajemen Kategori</CardTitle>
          <CardDescription>
            Kelola semua kategori produk di sini.
          </CardDescription>
        </div>
        <Button size="sm" onClick={handleOpenAddModal}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Kategori
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Gambar</TableHead>
              <TableHead>Nama Kategori</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.category_id}>
                  <TableCell>
                    <Image
                      alt={category.category_name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      width="64"
                      src={
                        category.category_image
                          ? `${backend_url}/${category.category_image}`
                          : "/placeholder-image.jpg"
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {category.category_name}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleOpenEditModal(category)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => promptDeleteCategory(category)}
                        >
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Belum ada kategori.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CategoryForm
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        category={editingCategory}
        onSave={handleSaveCategory}
        mode={modalMode}
      />
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus Kategori?"
        description={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.category_name}"? Tindakan ini tidak dapat dibatalkan.`}
      />
    </Card>
  );
};

export default AdminCategoriesPage;
