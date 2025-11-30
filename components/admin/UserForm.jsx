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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const rolesList = [
  {
    role_id: "ROL-01",
    role_name: "superadmin",
  },
  {
    role_id: "ROL-02",
    role_name: "admin",
  },
  {
    role_id: "ROL-03",
    role_name: "user",
  },
];

const UserForm = ({ isOpen, onOpenChange, user, onSave, mode }) => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_role: "",
    user_foto: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        user_name: user.user_name || "",
        user_email: user.user_email || "",
        user_password: "", // Password tidak di-prefill untuk keamanan
        user_role: user.user_role || "", // Menggunakan foreign key langsung dari objek user
        user_foto: null,
      });
      // Set preview untuk foto yang sudah ada
      setPreview(
        user.user_foto
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${user.user_foto}`
          : null
      );
    } else {
      // Reset form untuk mode 'add'
      setFormData({
        user_name: "",
        user_email: "",
        user_password: "",
        user_role: "ROL-03", // Default ke 'User' (sesuaikan dengan ID di DB)
        user_foto: null,
      });
      setPreview(null);
    }
  }, [user, mode, isOpen]);

  // Efek untuk membersihkan object URL untuk mencegah memory leak
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
      setFormData((prev) => ({ ...prev, user_foto: file }));
      // Hapus preview lama jika ada
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, user_role: value }));
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
              {mode === "edit" ? "Edit Pengguna" : "Tambah Pengguna Baru"}
            </DialogTitle>
            <DialogDescription>
              {mode === "edit"
                ? "Ubah detail pengguna di bawah ini. Kosongkan password jika tidak ingin mengubahnya."
                : "Isi detail untuk membuat akun pengguna baru."}
            </DialogDescription>
          </DialogHeader>
          {preview && (
            <div className="flex justify-center py-4">
              <Image
                src={preview}
                alt="Pratinjau foto profil"
                width={96}
                height={96}
                className="rounded-full aspect-square object-cover"
              />
            </div>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user_name" className="text-right">
                Nama
              </Label>
              <Input
                id="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user_email" className="text-right">
                Email
              </Label>
              <Input
                id="user_email"
                type="email"
                value={formData.user_email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user_password" className="text-right">
                Password
              </Label>
              <Input
                id="user_password"
                type="password"
                placeholder={
                  mode === "edit" ? "Kosongkan jika tidak diubah" : ""
                }
                onChange={handleChange}
                className="col-span-3"
                required={mode === "add"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user_foto" className="text-right">
                Foto
              </Label>
              <Input
                id="user_foto"
                type="file"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user_role" className="text-right">
                Peran
              </Label>
              <Select
                onValueChange={handleRoleChange}
                value={formData.user_role}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih peran" />
                </SelectTrigger>
                <SelectContent>
                  {rolesList.map((role) => (
                    <SelectItem key={role.role_id} value={role.role_id}>
                      {role.role_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
