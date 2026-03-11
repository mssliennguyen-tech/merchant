'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  BarChart3,
  Zap,
  Gift,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  AlertCircle,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navigationItems = [
  { href: '/dashboard', label: 'Bảng điều khiển', icon: BarChart3 },
  { href: '/users', label: 'Quản lý Người dùng', icon: Users },
  { href: '/customer-groups', label: 'Nhóm Khách Hàng', icon: Users },
  { href: '/campaigns', label: 'Chiến dịch', icon: Zap },
  { href: '/wallet', label: 'Ví điểm', icon: CreditCard },
  { href: '/vouchers', label: 'Quản lý Voucher', icon: Gift },
  { href: '/reward-center', label: 'Quản lý điểm thưởng', icon: Gift },
  { href: '/rewards', label: 'Phần thưởng', icon: Gift },
  { href: '/hr', label: 'Nhân sự', icon: BarChart3 },
  { href: '/transactions', label: 'Giao dịch', icon: CreditCard },
  { href: '/reports', label: 'Báo cáo', icon: FileText },
  { href: '/alerts', label: 'Cảnh báo', icon: AlertCircle },
  { href: '/integrations', label: 'Tích hợp', icon: Settings },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    toast.success('Đã đăng xuất thành công');
    setUserMenuOpen(false);
    setTimeout(() => {
      router.push('/login');
    }, 500);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <span className="text-sm font-bold text-sidebar-primary-foreground">
                  MP
                </span>
              </div>
              <span className="font-semibold">MyPoint</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-sidebar-border px-3 py-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50"
            >
              <LogOut className="h-5 w-5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Quick Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/campaigns/new">
                <Button size="sm" variant="outline" className="text-xs">
                  + Chiến dịch
                </Button>
              </Link>
              <Link href="/reward-center">
                <Button size="sm" variant="outline" className="text-xs">
                  Tặng phần thưởng
                </Button>
              </Link>
              <Link href="/vouchers">
                <Button size="sm" variant="outline" className="text-xs">
                  + Phiếu mua
                </Button>
              </Link>
            </div>

            <div className="flex-1 md:flex-none" />

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
              >
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">NV</span>
                </div>
                <span className="hidden text-sm font-medium md:inline">
                  Người dùng
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50">
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm hover:bg-muted rounded-t-lg"
                  >
                    Cài đặt
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-muted rounded-b-lg"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
