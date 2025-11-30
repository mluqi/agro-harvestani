"use client";

import { PanelLeftClose, PanelRightClose, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const Header = ({ isCollapsed, toggleSidebar }) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {/* Tombol untuk ciutkan sidebar di Desktop */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:flex"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <PanelRightClose className="h-5 w-5" />
        ) : (
          <PanelLeftClose className="h-5 w-5" />
        )}
      </Button>

      {/* Tombol menu untuk Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <Sidebar isCollapsed={false} />
        </SheetContent>
      </Sheet>

      {/* Bisa ditambahkan item lain di header di sini, misal: User Menu, Search Bar */}
      <div className="w-full flex-1"></div>
    </header>
  );
};

export default Header;
