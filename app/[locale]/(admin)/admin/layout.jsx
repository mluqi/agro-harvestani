"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminDashboardLayout({ children }) {
  const { isAuthenticated, isProcessingAuth, user } = useAuth();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isProcessingAuth && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isProcessingAuth, router, user]);

  if (isProcessingAuth || !isAuthenticated) {
    return <div>Loading...</div>;
  }
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr]">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="flex flex-col">
        <Header isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
