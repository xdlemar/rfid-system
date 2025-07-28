import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, User } from "lucide-react";

export default function AuthenticatedLayout({ user, header, children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="shrink-0">
            <Link href={route("dashboard")}>
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* User Dropdown */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {user.name}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48 mt-2">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={route("profile.edit")} className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="w-full text-left text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      {header && (
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      {/* Page Content */}
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
