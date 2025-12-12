"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import UserForm from "@/components/admin/UserForm";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const backend_url =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.agroharvestani.com";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError("Gagal memuat data pengguna. Silakan coba lagi.");
      toast.error("Gagal memuat data pengguna.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setModalMode("edit");
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (formData) => {
    try {
      const data = new FormData();
      data.append("user_name", formData.user_name);
      data.append("user_email", formData.user_email);
      data.append("user_role", formData.user_role);

      if (formData.user_foto) {
        data.append("user_foto", formData.user_foto);
      }

      // Hanya tambahkan password jika diisi
      if (formData.user_password) {
        data.append("user_password", formData.user_password);
      }

      if (modalMode === "edit") {
        // Axios akan secara otomatis mengatur Content-Type ke multipart/form-data
        await api.put(`/users/${editingUser.id}`, data);
        toast.success("Pengguna berhasil diperbarui.");
      } else {
        // Untuk 'add', kita panggil endpoint signup
        // Pastikan password ada untuk pengguna baru
        if (!formData.user_password)
          throw new Error("Password wajib diisi untuk pengguna baru.");
        await api.post("/auth/signup", data);
        toast.success("Pengguna baru berhasil ditambahkan.");
      }
      setIsModalOpen(false);
      fetchUsers(); // Muat ulang data pengguna
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Terjadi kesalahan.";
      toast.error(errorMessage);
      console.error(err);
    }
  };

  const promptDeleteUser = (user) => {
    setUserToDelete(user);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await api.delete(`/users/${userToDelete.id}`);
      toast.success(`Pengguna "${userToDelete.user_name}" berhasil dihapus.`);
      fetchUsers(); // Muat ulang data pengguna setelah berhasil dihapus
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Gagal menghapus pengguna.";
      toast.error(errorMessage);
      console.error("Error deleting user:", err);
    } finally {
      setUserToDelete(null);
    }
  };

  if (loading) {
    return <div>Memuat data pengguna...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manajemen Pengguna</CardTitle>
          <CardDescription>
            Lihat, tambah, dan kelola semua pengguna yang terdaftar di sistem.
          </CardDescription>
        </div>
        <Button size="sm" onClick={handleOpenAddModal}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Foto</span>
              </TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Peran</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead>
                <span className="sr-only">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="User avatar"
                    className="aspect-square rounded-full object-cover"
                    height="40"
                    width="40"
                    src={
                      user.user_foto
                        ? `${backend_url}/${user.user_foto}`
                        : "/placeholder-user.jpg" // Pastikan Anda memiliki gambar placeholder ini di folder /public
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{user.user_name}</TableCell>
                <TableCell>{user.user_email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.role?.role_name === "admin" ? "default" : "secondary"
                    }
                  >
                    {user.role?.role_name || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleOpenEditModal(user)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => promptDeleteUser(user)}
                      >
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <UserForm
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        user={editingUser}
        onSave={handleSaveUser}
        mode={modalMode}
      />
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus Pengguna?"
        description={`Apakah Anda yakin ingin menghapus pengguna "${userToDelete?.user_name}"? Tindakan ini tidak dapat dibatalkan.`}
      />
    </Card>
  );
};

export default UsersPage;
