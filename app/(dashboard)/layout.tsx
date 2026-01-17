'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Phone,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, Button } from '@/components/ui';
import { useAuth } from '@/lib/auth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Calls', href: '/calls', icon: Phone },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, fetchUser, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchUser();
    }
  }, [isAuthenticated]);

  // Check email verification status
  useEffect(() => {
    if (isAuthenticated && user && !user.is_verified) {
      router.push('/verification-required');
    }
  }, [isAuthenticated, user]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-border',
          'transform transition-transform duration-200 ease-out',
          'lg:transform-none',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <Link href="/dashboard" className="text-xl font-bold text-primary-500">
            Bright Secure
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-light hover:text-dark"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Organization selector */}
        <div className="p-4 border-b border-border">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-colors">
            <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary-500" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-dark text-sm truncate">
                {(user as any)?.organizations?.[0]?.name || 'My Organization'}
              </div>
              <div className="text-xs text-light capitalize">
                {(user as any)?.organizations?.[0]?.subscription_tier || 'Trial'} Plan
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-light" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-500'
                    : 'text-light hover:bg-surface hover:text-dark'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-border">
          <div className="h-full px-4 lg:px-8 flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-light hover:text-dark"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="p-2 text-light hover:text-dark relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary-500 rounded-full" />
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors"
                >
                  <Avatar
                    name={user?.first_name ? `${user.first_name} ${user.last_name}` : 'User'}
                    size="sm"
                  />
                  <span className="hidden md:block text-sm font-medium text-dark">
                    {user?.first_name || 'User'}
                  </span>
                  <ChevronDown className="h-4 w-4 text-light" />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-airbnb-lg border border-border z-20">
                      <div className="p-2">
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-dark rounded-md hover:bg-surface"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Log out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
