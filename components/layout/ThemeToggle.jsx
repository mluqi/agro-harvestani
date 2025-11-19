"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle({ isScrolled }) {
  const { theme, setTheme } = useTheme("light");

  const iconClasses = isScrolled
    ? "text-gray-600 dark:text-gray-300"
    : "text-white ";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative dark:hover:bg-transparent hover:text-gray-400 focus:bg-transparent focus:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-300 cursor-pointer"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {theme === "light" ? (
            <Sun className={`h-[1.2rem] w-[1.2rem] ${iconClasses}`} />
          ) : (
            <Moon className={`h-[1.2rem] w-[1.2rem] ${iconClasses}`} />
          )}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
