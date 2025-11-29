// src/components/layout/Sidebar.tsx
import { NavLink } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  mode?: "desktop" | "mobile";
  onItemClick?: () => void; // لإغلاق الـ drawer بعد الضغط على link في الموبايل
}

const base =
  "group relative flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors";
const inactive =
  "text-slate-300 hover:bg-slate-800 hover:text-white dark:text-slate-400 dark:hover:bg-slate-800";
const active =
  "bg-primary-600 text-white shadow hover:bg-primary-700";

export function Sidebar({
  collapsed,
  mode = "desktop",
  onItemClick,
}: SidebarProps) {
  const isDesktop = mode === "desktop";

  const rootClass = isDesktop
    ? `hidden md:flex flex-col ${
        collapsed ? "w-16" : "w-56"
      } bg-sidebar text-slate-100 border-r border-slate-800 
         dark:bg-slate-950 dark:border-slate-800 transition-all duration-300`
    : `flex md:hidden flex-col w-64 bg-sidebar text-slate-100 border-r border-slate-800 
         dark:bg-slate-950 dark:border-slate-800 shadow-lg transition-transform duration-300`;

  // في الموبايل نظهر النصوص دائماً، في الديسكتوب نستخدم collapse
  const showLabels = isDesktop ? !collapsed : true;

  return (
    <aside className={rootClass}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        {showLabels ? (
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Navigation
          </p>
        ) : (
          <span className="text-[10px] text-slate-500 uppercase tracking-wide">
            Nav
          </span>
        )}
      </div>

      {/* Links */}
      <nav className="flex-1 p-3 space-y-1">
        {/* Dashboard link */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
          onClick={() => onItemClick?.()}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900/40 text-lg">
            📊
          </span>

          {showLabels && <span>Dashboard</span>}

          {/* Tooltip في حالة desktop collapsed فقط */}
          {isDesktop && !showLabels && (
            <span
              className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 
                         whitespace-nowrap rounded bg-slate-900 text-xs text-slate-100 px-2 py-1 
                         opacity-0 group-hover:opacity-100 shadow-lg border border-slate-700
                         transition-opacity duration-200 z-20"
            >
              Dashboard
            </span>
          )}
        </NavLink>

        {/* Users link */}
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
          onClick={() => onItemClick?.()}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900/40 text-lg">
            👥
          </span>

          {showLabels && <span>Users</span>}

          {isDesktop && !showLabels && (
            <span
              className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 
                         whitespace-nowrap rounded bg-slate-900 text-xs text-slate-100 px-2 py-1 
                         opacity-0 group-hover:opacity-100 shadow-lg border border-slate-700
                         transition-opacity duration-200 z-20"
            >
              Users
            </span>
          )}
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 text-xs text-slate-400">
        {showLabels ? (
          <>
            <p className="font-medium text-slate-300">
              React · Tailwind Dashboard
            </p>
            <p className="mt-1 text-slate-500">
              Reusable layout for future projects.
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 text-[10px] text-slate-500">
            <span>UM</span>
            <span>v1.0</span>
          </div>
        )}
      </div>
    </aside>
  );
}
