"use client";

import React, { useState, useEffect } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, EyeIcon, Eye } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";

const backend_url =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.agroharvestani.com";

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const router = useRouter();

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
        search: searchTerm,
        status: statusFilter,
        startDate: dateRange?.from,
        endDate: dateRange?.to,
      };
      // Hapus parameter yang tidak terdefinisi
      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key]
      );

      const response = await api.get("/blogs/manage/all", { params });
      setBlogs(response.data.data || []);
      setPagination(
        response.data.pagination || { currentPage: 1, totalPages: 1 }
      );
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      toast.error("Gagal memuat daftar artikel.");
    } finally {
      setLoading(false);
    }
  };

  // Efek untuk mengambil data saat filter berubah
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchBlogs(1); // Reset ke halaman 1 saat filter berubah
    }, 500); // Debounce untuk input pencarian

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, statusFilter, dateRange]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBlogs(newPage);
    }
  };

  const handleDelete = async (blogId) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      return;
    }

    try {
      await api.delete(`/blogs/${blogId}`);
      toast.success("Artikel berhasil dihapus.");
      // Refresh data setelah berhasil menghapus
      fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Gagal menghapus artikel.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manajemen Blog</CardTitle>
          <CardDescription>Kelola semua artikel blog di sini.</CardDescription>
        </div>
        <Button size="sm" onClick={() => router.push("/admin/blogs/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Artikel Baru
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Cari berdasarkan judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left"> Thumbnail</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bahasa</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Image
                      src={
                        blog.featured_image
                          ? `${backend_url}/${blog.featured_image}`
                          : "/placeholder-user.jpg" // Pastikan Anda memiliki gambar placeholder ini di folder /public
                      }
                      alt={blog.title}
                      width="40"
                      height="40"
                      className="aspect-square rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.author?.user_name || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        blog.status === "published" ? "default" : "secondary"
                      }
                    >
                      {blog.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{blog.locale.toUpperCase()}</TableCell>
                  <TableCell>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        window.open(`/blogs/${blog.slug}`, "_blank")
                      }
                      variant="ghost"
                      className="cursor-pointer hover:text-green-600"
                    >
                      <EyeIcon className="h-2 w-2 " />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/admin/blogs/edit/${blog.id}`)
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(blog.id)}
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
                <TableCell colSpan={8} className="text-center">
                  Belum ada artikel.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage <= 1}
          >
            Sebelumnya
          </Button>
          <span className="text-sm">
            Halaman {pagination.currentPage} dari {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
          >
            Berikutnya
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBlogsPage;
