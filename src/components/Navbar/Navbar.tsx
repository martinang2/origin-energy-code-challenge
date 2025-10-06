"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/accounts", label: "Energy Accounts" },
  { href: "/payments", label: "Payment History" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <p className="text-xl font-bold text-orange-600">Origin Energy</p>

          <div className="relative flex bg-gray-100 rounded-lg p-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-2 text-sm font-medium rounded-md relative z-10 transition-colors ${
                    isActive
                      ? "text-orange-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
