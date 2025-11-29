// src/components/layout/Navbar.tsx
import { Link } from "react-router-dom";
import type { ThemeMode } from "../../layouts/AppLayout";

interface NavbarProps {
  onToggleSidebarDesktop: () => void;
  onOpenMobileSidebar: () => void;
  onToggleTheme: () => void;
  theme: ThemeMode;
  sidebarCollapsed: boolean;
}

export function Navbar({
  onToggleSidebarDesktop,
  onOpenMobileSidebar,
  onToggleTheme,
  theme,
  sidebarCollapsed,
}: NavbarProps) {
  return (
    <header className="h-14 flex items-center justify-between px-4 lg:px-8 bg-slate-900 text-white dark:bg-slate-950 shadow">
      {/* LEFT: mobile + desktop sidebar buttons + logo */}
      <div className="flex items-center gap-3">
        {/* Mobile: hamburger يفتح الـ drawer */}
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden h-9 w-9 flex items-center justify-center rounded-full 
                    bg-slate-800 hover:bg-slate-700 
                    dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>


        {/* Desktop: زر collapse/expand واضح */}
        <button
          onClick={onToggleSidebarDesktop}
          className="hidden md:flex h-9 w-9 items-center justify-center rounded-full 
                     bg-slate-800 hover:bg-slate-700 
                     dark:bg-slate-700 dark:hover:bg-slate-600
                     transition-colors"
          aria-label="Toggle sidebar"
        >
          <span
            className={`
              inline-flex items-center justify-center h-5 w-5
              text-white dark:text-slate-200
              transition-transform duration-300
              ${sidebarCollapsed ? "rotate-180" : "rotate-0"}
            `}
          >
            {/* سهم واضح (Chevron) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </span>
        </button>

        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-primary-600 text-white font-bold">
            UM
          </span>
          <div>
            <h1 className="text-sm font-semibold leading-tight">
              User Management
            </h1>
            <p className="text-xs text-slate-300">
              React · Prisma · Inngest · Render
            </p>
          </div>
        </div>
      </div>

      {/* MIDDLE: links (desktop فقط) */}
      <nav className="hidden md:flex items-center gap-4 text-sm">
        <Link to="/" className="hover:text-primary-300 transition">
          Dashboard
        </Link>
        <Link to="/users" className="hover:text-primary-300 transition">
          Users
        </Link>
      </nav>

      {/* RIGHT: theme toggle + avatar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full 
                     bg-slate-800 hover:bg-slate-700 
                     dark:bg-slate-700 dark:hover:bg-slate-600
                     text-base"
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <span className="text-xs text-slate-300 hidden sm:inline">
          Yaser · Instructor Mode
        </span>
        <div className="h-8 w-8 rounded-full bg-primary-600 text-xs flex items-center justify-center font-semibold">
          YA
        </div>
      </div>
    </header>
  );
}
