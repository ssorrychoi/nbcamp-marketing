"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            포트폴리오
          </Link>
          <div className="flex gap-6">
            <Link
              href="/til/"
              className={`text-sm font-medium transition-colors ${
                isActive("/til")
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              TIL
            </Link>
            <Link
              href="/wil/"
              className={`text-sm font-medium transition-colors ${
                isActive("/wil")
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              WIL
            </Link>
            <Link
              href="/projects/"
              className={`text-sm font-medium transition-colors ${
                isActive("/projects")
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              프로젝트
            </Link>
          </div>
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
