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
import { EyeIcon, MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import ProductForm from "@/components/admin/ProductForm";

const backend_url =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products/admin/all");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Gagal memuat daftar produk.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setModalMode("edit");
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (formData) => {
    try {
      const data = new FormData();
      // Append all fields from formData to FormData object
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      if (modalMode === "edit") {
        await api.put(`/products/${editingProduct.product_id}`, data);
        toast.success("Produk berhasil diperbarui.");
      } else {
        await api.post("/products", data);
        toast.success("Produk baru berhasil ditambahkan.");
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Terjadi kesalahan.";
      toast.error(errorMessage);
      console.error(err);
    }
  };

  const promptDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await api.delete(`/products/${productToDelete.product_id}`);
      toast.success(
        `Produk "${
          productToDelete.product_name_id || productToDelete.product_name_en
        }" berhasil dihapus.`
      );
      fetchProducts();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Gagal menghapus produk.";
      toast.error(errorMessage);
      console.error("Error deleting product:", err);
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manajemen Produk</CardTitle>
          <CardDescription>Kelola semua produk di sini.</CardDescription>
        </div>
        <Button size="sm" onClick={handleOpenAddModal}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Produk
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Gambar</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Asal</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Kemasan</TableHead>
              <TableHead>Catatan</TableHead>
              <TableHead className="text-right">Preview</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.product_id}>
                  <TableCell>
                    <Image
                      alt={product.product_name_en}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      width="64"
                      src={
                        product.product_image
                          ? `${backend_url}/${product.product_image}`
                          : "/placeholder-image.jpg"
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.product_name_id || product.product_name_en}
                  </TableCell>
                  <TableCell>
                    {product.Category?.category_name || "N/A"}
                  </TableCell>
                  <TableCell>
                    {product.product_desc_id ||
                      product.product_desc_en ||
                      "N/A"}
                  </TableCell>
                  <TableCell>
                    {product.product_origin_id ||
                      product.product_origin_en ||
                      "N/A"}
                  </TableCell>
                  <TableCell>
                    {product.product_grade_id ||
                      product.product_grade_en ||
                      "N/A"}
                  </TableCell>
                  <TableCell>
                    {product.product_package_id ||
                      product.product_package_en ||
                      "N/A"}
                  </TableCell>
                  <TableCell>
                    {product.product_notes_id ||
                      product.product_notes_en ||
                      "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() =>
                        window.open(
                          `/products/${product.product_slug_id ||
                            product.product_slug_en}`,
                          "_blank"
                        )
                      }
                      variant="ghost"
                      className="cursor-pointer hover:text-green-600"
                    >
                      <EyeIcon className="h-4 w-4 " />
                    </Button>
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
                          onClick={() => handleOpenEditModal(product)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => promptDeleteProduct(product)}
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
                <TableCell colSpan={10} className="text-center">
                  Belum ada produk.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <ProductForm
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={editingProduct}
        onSave={handleSaveProduct}
        mode={modalMode}
      />
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus Produk?"
        description={`Apakah Anda yakin ingin menghapus produk "${
          productToDelete?.product_name_id || productToDelete?.product_name_en
        }"? Tindakan ini tidak dapat dibatalkan.`}
      />
    </Card>
  );
};

export default AdminProductsPage;
