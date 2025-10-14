"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { Tractor, User, LogOut, Settings, LayoutDashboard } from "lucide-react"

export function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Tractor className="h-6 w-6" />
              FarmEquip
            </Link>

            {user && (
              <div className="hidden md:flex items-center gap-1">
                <Button variant={isActive("/dashboard") ? "secondary" : "ghost"} asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                {user.role === "farmer" && (
                  <Button variant={isActive("/equipment") ? "secondary" : "ghost"} asChild>
                    <Link href="/equipment">Browse Equipment</Link>
                  </Button>
                )}
                {user.role === "farmer" && (
                  <Button variant={isActive("/my-bookings") ? "secondary" : "ghost"} asChild>
                    <Link href="/my-bookings">My Bookings</Link>
                  </Button>
                )}
                {user.role === "owner" && (
                  <Button variant={isActive("/my-equipment") ? "secondary" : "ghost"} asChild>
                    <Link href="/my-equipment">My Equipment</Link>
                  </Button>
                )}
                {user.role === "admin" && (
                  <Button variant={isActive("/admin") ? "secondary" : "ghost"} asChild>
                    <Link href="/admin">Admin</Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <NotificationsDropdown />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user.name}</span>
                        <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
