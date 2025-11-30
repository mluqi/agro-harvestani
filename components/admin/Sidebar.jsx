"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import {
  Newspaper,
  LayoutDashboard,
  Users,
  Package,
  User,
  Shapes,
  Inbox,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import assets from "@/public/assets/assets";
import Image from "next/image";

const backend_url =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Mapping untuk mencocokkan path dari API dengan ikon
const iconMap = {
  "/admin": LayoutDashboard,
  "/admin/blogs": Newspaper,
  "/admin/users": Users,
  "/admin/category": Shapes,
  "/admin/inbox": Inbox,
  "/admin/products": Package,
};

const Sidebar = ({ isCollapsed }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { menus, isMenuLoading } = useAuth(); // Mengambil menu dari useAuth

  if (isMenuLoading) {
    // Tampilkan skeleton loading yang konsisten dengan layout
    return (
      <aside
        className={`hidden border-r bg-muted/40 md:flex md:flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4">Loading...</div>
      </aside>
    );
  }

  return (
    <aside
      className={`hidden border-r bg-muted/40 md:flex md:flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src={assets.logo}
              alt="AgroHarvestani"
              width="35"
              height="35"
              className="aspect-square rounded-full object-cover"
            />
            {!isCollapsed && <span className="">AgroHarvestani</span>}
          </Link>
        </div>
        <div className="flex-1">
          <TooltipProvider>
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {menus.map((menu) => {
                const Icon = iconMap[menu.menu_path] || LayoutDashboard; // Default icon jika tidak ditemukan
                const label = menu.menu_name;
                const href = menu.menu_path;

                return isCollapsed ? (
                  <Tooltip key={menu.menu_id} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={href}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                          pathname === href
                            ? "bg-muted text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{label}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{label}</TooltipContent>
                  </Tooltip>
                ) : (
                  <Link
                    key={menu.menu_id}
                    href={href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                      pathname.startsWith(href)
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </TooltipProvider>
        </div>
        <div className="mt-auto border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-12 w-full items-center justify-start gap-3 px-2"
              >
                <Image
                  src={user?.user_foto ? `${backend_url}/${user.user_foto}` : assets.logo}
                  width={30}
                  height={30}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                      {user?.user_name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {user?.user_email}
                    </span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/admin/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={async () => await logout()}>
                <LogOut className="mr-2 h-4 w-4" /> Logout{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
