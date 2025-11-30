"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const { login, isProcessingAuth, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Jika pengguna sudah terautentikasi, arahkan ke halaman admin
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  if (isAuthenticated) return null;

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader className="text-center flex flex-col items-center">
          <Image
            src="/og-image.png" // Path to your logo image
            alt="AgroHarvestani Logo"
            width={100} // Adjust width as needed
            height={100} // Adjust height as needed
            className="mb-4"
          />
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Please enter your credentials to access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isProcessingAuth}
              className="w-full bg-green-800 hover:bg-green-700"
            >
              {isProcessingAuth ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default AdminLoginPage;
