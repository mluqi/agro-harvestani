"use client";

import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaWhatsapp } from "react-icons/fa";

// Nomor telepon ini bisa juga disimpan di environment variable untuk keamanan
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6287805300025";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const WhatsappButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Fungsi untuk menampilkan tombol saat scroll
  const toggleVisibility = () => {
    // Tampilkan tombol jika pengguna scroll lebih dari 200px
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Tambahkan event listener saat komponen dimuat
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Hapus event listener saat komponen dilepas untuk mencegah memory leak
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            <FaWhatsapp className="h-8 w-8" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat via WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsappButton;
