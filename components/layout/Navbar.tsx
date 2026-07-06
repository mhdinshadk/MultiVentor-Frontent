"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Newspaper, Tag, Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Articles", href: "/articles", icon: Newspaper },
    { name: "Categories", href: "/categories", icon: Tag },
  ];

  return (
    <header className="glass-nav sticky top-0 z-50 w-full transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-display text-2xl font-black tracking-tight text-zinc-900 transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-gold shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <BookOpen size={20} className="animate-pulse" />
          </div>
          <span>
            Multi<span className="text-gold">Blog</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-zinc-100 text-black border border-zinc-200/50 shadow-sm"
                    : "text-zinc-650 hover:bg-zinc-50 hover:text-gold"
                }`}
              >
                <Icon size={16} className={isActive ? "text-gold" : "text-zinc-400"} />
                <span className="hidden sm:inline">{item.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gold shadow-sm" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}