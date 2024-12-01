import React from 'react';
import { Home, Package, Calendar, MessageSquare, BookOpen, Settings, LogOut, Phone, HelpCircle, Truck, RotateCcw, ShoppingBag, Mail, Share2, MessageCircle, Users } from 'lucide-react';
import { Link } from '../Link';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const menuItems = [
    { icon: Home, label: 'Overview', href: '/dashboard' },
    { icon: Package, label: 'Products', href: '/dashboard/products' },
    { icon: BookOpen, label: 'Our Story', href: '/dashboard/story' },
    { icon: Calendar, label: 'Events', href: '/dashboard/events' },
    { icon: MessageSquare, label: 'Reviews', href: '/dashboard/reviews' },
    { icon: ShoppingBag, label: 'Orders', href: '/dashboard/orders' },
    { icon: Mail, label: 'Subscribers', href: '/dashboard/subscribers' },
    { icon: Share2, label: 'Social Links', href: '/dashboard/social' },
    { icon: MessageCircle, label: 'Messages', href: '/dashboard/messages' },
    { icon: Users, label: 'Partners', href: '/dashboard/partners' },
    { icon: Phone, label: 'Contact', href: '/dashboard/contact' },
    { icon: HelpCircle, label: 'FAQ', href: '/dashboard/faq' },
    { icon: Truck, label: 'Shipping', href: '/dashboard/shipping' },
    { icon: RotateCcw, label: 'Returns', href: '/dashboard/returns' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex h-screen">
        <div className="w-64 bg-white border-r border-neutral-200">
          <div className="p-6">
            <div className="flex items-center gap-2">
              <img src="/wino-logo.svg" alt="Wino" className="h-8 w-auto" />
              <h2 className="text-xl font-bold text-amber-800">Dashboard</h2>
            </div>
          </div>
          <nav className="mt-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-6 py-3 text-neutral-600 hover:bg-amber-50 hover:text-amber-800"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
            <button className="w-full flex items-center px-6 py-3 text-neutral-600 hover:bg-amber-50 hover:text-amber-800 mt-auto">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}