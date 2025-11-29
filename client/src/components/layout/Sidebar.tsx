// src/components/layout/Sidebar.tsx
import { NavLink } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
}

const base =
  "group relative flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors";
const inactive =
  "text-slate-300 hover:bg-slate-800 hover:text-white dark:text-slate-400 dark:hover:bg-slate-800";
const active =
  "bg-primary-600 text-white shadow hover:bg-primary-700";

export function Sidebar({ collapsed }: SidebarProps) {
  const widthClass = collapsed ? "w-16" : "w-56";

  return (
    <aside
      className={`hidden md:flex flex-col ${widthClass} bg-sidebar text-slate-100 border-r border-slate-800 
                  dark:bg-slate-950 dark:border-slate-800 transition-all duration-300`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        {!collapsed && (
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Navigation
          </p>
        )}
        {collapsed && (
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
        >
          {/* Icon */}
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900/40 text-lg">
            📊
          </span>

          {/* Label (hidden when collapsed) */}
          {!collapsed && <span>Dashboard</span>}

          {/* Tooltip when collapsed */}
          {collapsed && (
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
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900/40 text-lg">
            👥
          </span>

          {!collapsed && <span>Users</span>}

          {collapsed && (
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
        {!collapsed ? (
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
