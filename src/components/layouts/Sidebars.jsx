'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// Menu config
const menu = [
  {
    label: 'Beranda',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Performance Review',
    icon: Clock,
    children: [
      { label: '360', href: '/performance-review/360/pending-action' },
      { label: 'Kudos', href: '/kudos' },
    ],
  },
];

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});
  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      {menu.map((item) => {
        const Icon = item.icon;
        // Menu with children
        if (item.children) {
          const isOpen = openMenus[item.label] ?? false;
          return (
            <div key={item.label} className="mb-2">
              <div
                className="flex items-center justify-between text-gray-700 font-semibold p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleMenu(item.label)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {isOpen && (
                <div className="pl-10 mt-1 space-y-1 text-sm text-gray-600">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block cursor-pointer p-1 hover:text-black"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Menu without children -> Link
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 text-gray-700 font-semibold p-2 rounded-lg hover:bg-gray-100 cursor-pointer mb-2"
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
