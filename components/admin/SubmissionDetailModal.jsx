"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">
      {value || "-"}
    </p>
  </div>
);

const SubmissionDetailModal = ({ isOpen, onOpenChange, submission }) => {
  if (!submission) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detail Pesan Masuk</DialogTitle>
          <DialogDescription>
            Detail lengkap pesan dari {submission.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Nama" value={submission.name} />
            <DetailItem label="Email" value={submission.email} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Telepon" value={submission.phone} />
            <DetailItem
              label="Tanggal Kirim"
              value={formatDate(submission.createdAt)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Tipe</p>
              <Badge
                variant={
                  submission.type === "contact" ? "secondary" : "default"
                }
                className="mt-1"
              >
                {submission.type}
              </Badge>
            </div>
            {submission.type === "request" && (
              <DetailItem label="Tujuan" value={submission.purpose} />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pesan</p>
            <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-md border dark:border-gray-700">
              <p className="text-sm text-gray-900 dark:text-gray-200 whitespace-pre-wrap">
                {submission.message}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDetailModal;
