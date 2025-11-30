"use client";

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
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import SubmissionDetailModal from "@/components/admin/SubmissionDetailModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchSubmissions = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
        type: typeFilter,
      };
      const response = await api.get("/submissions", { params });
      setSubmissions(response.data.data || []);
      setPagination(
        response.data.pagination || { currentPage: 1, totalPages: 1 }
      );
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
      toast.error("Gagal memuat pesan masuk.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [typeFilter]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchSubmissions(newPage);
    }
  };
  const promptDelete = (submission) => {
    setSubmissionToDelete(submission);
    setIsConfirmOpen(true);
  };

  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission);
    setIsDetailModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!submissionToDelete) return;
    try {
      await api.delete(`/submissions/${submissionToDelete.submission_id}`);
      toast.success("Pesan berhasil dihapus.");
      fetchSubmissions();
    } catch (err) {
      toast.error("Gagal menghapus pesan.");
    } finally {
      setSubmissionToDelete(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pesan Masuk</CardTitle>
        <CardDescription>
          Lihat semua pesan yang dikirim melalui form kontak dan permintaan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="contact">Kontak</SelectItem>
              <SelectItem value="request">Permintaan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Pesan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Memuat...
                </TableCell>
              </TableRow>
            ) : submissions.length > 0 ? (
              submissions.map((sub) => (
                <TableRow key={sub.submission_id}>
                  <TableCell>{formatDate(sub.createdAt)}</TableCell>
                  <TableCell className="font-medium">{sub.name}</TableCell>
                  <TableCell>{sub.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={sub.type === "contact" ? "secondary" : "default"}
                    >
                      {sub.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {sub.message}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(sub)}
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => promptDelete(sub)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Tidak ada pesan masuk.
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
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus Pesan?"
        description="Apakah Anda yakin ingin menghapus pesan ini secara permanen?"
      />
      <SubmissionDetailModal
        isOpen={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        submission={selectedSubmission}
      />
    </Card>
  );
};

export default SubmissionsPage;
