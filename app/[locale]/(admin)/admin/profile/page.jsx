"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import assets from "@/public/assets/assets";

const backend_url =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.agroharvestani.com";

const ProfilePage = () => {
  const { user, revalidateUser } = useAuth();

  // State for profile form
  const [profileData, setProfileData] = useState({
    user_name: "",
    user_email: "",
  });
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // State for password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        user_name: user.user_name,
        user_email: user.user_email,
      });
      setPhotoPreview(
        user.user_foto ? `${backend_url}/${user.user_foto}` : assets.logo
      );
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingProfile(true);
    const formData = new FormData();
    formData.append("user_name", profileData.user_name);
    formData.append("user_email", profileData.user_email);
    if (photo) {
      formData.append("user_foto", photo);
    }

    try {
      await api.put("/users/profile", formData);
      toast.success("Profile updated successfully!");
      const updatedUser = await revalidateUser(); // Re-fetch dan dapatkan data baru
      if (updatedUser) {
        // Perbarui state form lokal dengan data yang baru
        setProfileData({
          user_name: updatedUser.user_name,
          user_email: updatedUser.user_email,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
  };

  const onPasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setIsSubmittingPassword(true);
    try {
      await api.put("/users/profile/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password."
      );
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
          <CardDescription>
            Perbarui informasi profil dan alamat email Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onProfileSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                src={photoPreview || assets.logo}
                alt="Avatar"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <Input id="photo" type="file" onChange={handlePhotoChange} />
            </div>
            <div>
              <Label htmlFor="user_name">Nama</Label>
              <Input
                id="user_name"
                value={profileData.user_name}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <Label htmlFor="user_email">Email</Label>
              <Input
                id="user_email"
                type="email"
                value={profileData.user_email}
                onChange={handleProfileChange}
              />
            </div>
            <Button type="submit" disabled={isSubmittingProfile}>
              {isSubmittingProfile ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kata Sandi</CardTitle>
          <CardDescription>
            Ubah kata sandi Anda. Pastikan untuk menggunakan kata sandi yang
            kuat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onPasswordSubmit} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Kata Sandi Saat Ini</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="newPassword">Kata Sandi Baru</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">
                Konfirmasi Kata Sandi Baru
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmittingPassword}>
              {isSubmittingPassword ? "Menyimpan..." : "Ubah Kata Sandi"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
