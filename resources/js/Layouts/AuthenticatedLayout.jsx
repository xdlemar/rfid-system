import React, { useState } from "react";
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
import {
  ChevronDown,
  LogOut,
  User,
  Menu,
  LayoutDashboard,
  Users,
  Briefcase,
  Clock,
} from "lucide-react";

export default function AuthenticatedLayout({ user, header, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isAdmin = user.role === "admin";
  const isEmployee = user.role === "employee";

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 shadow-md border-r bg-gray-900 text-white transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <span className="font-bold text-lg tracking-wide">Admin Panel</span>
        </div>

        <nav className="mt-4 space-y-1 px-2 text-sm font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition"
          >
            <LayoutDashboard className="w-5 h-5 text-indigo-400" />
            <span>Dashboard</span>
          </Link>

          {isAdmin && (
            <>
              <Link
                href={route("employees.index")}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition"
              >
                <Users className="w-5 h-5 text-indigo-400" />
                <span>Manage Employees</span>
              </Link>

              <Link
                href={route("jobroles.index")}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition"
              >
                <Briefcase className="w-5 h-5 text-indigo-400" />
                <span>Manage Job Roles</span>
              </Link>
            </>
          )}

          {isEmployee && (
            <Link
              href="/dashboard"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition"
            >
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <nav className="bg-white border-b shadow-sm flex items-center justify-between h-16 px-4 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900">
              <Menu />
            </button>
            <div className="text-lg font-semibold text-gray-800 tracking-wide">{header || "Welcome"}</div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
                <User className="w-4 h-4" />
                {user.name}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mt-2 bg-white border border-gray-200 shadow-lg">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={route("profile.edit")} className="w-full text-gray-700 hover:text-indigo-500">
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
        </nav>

        {/* Main Page Content */}
        <main className="p-6 flex-1 overflow-y-auto bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
