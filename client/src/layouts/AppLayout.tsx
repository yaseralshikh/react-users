// src/layouts/AppLayout.tsx
import { type ReactNode, useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";

export type ThemeMode = "light" | "dark";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // لـ الديسكتوب فقط (collapse)
  const toggleSidebarDesktop = () =>
    setSidebarCollapsed((prev) => !prev);

  // لفتح الـ drawer في الموبايل
  const openMobileSidebar = () => setMobileSidebarOpen(true);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors">
        <Navbar
          onToggleSidebarDesktop={toggleSidebarDesktop}
          onOpenMobileSidebar={openMobileSidebar}
          onToggleTheme={toggleTheme}
          theme={theme}
          sidebarCollapsed={sidebarCollapsed}
        />

        <div className="flex flex-1">
          {/* Desktop sidebar */}
          <Sidebar mode="desktop" collapsed={sidebarCollapsed} />

          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>

        <Footer />

        {/* Mobile drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            {/* الخلفية الشفافة */}
            <div
              className="fixed inset-0 bg-black/40"
              onClick={closeMobileSidebar}
            />
            {/* لوحة الـ Drawer نفسها */}
            <div className="relative z-50">
              <Sidebar
                mode="mobile"
                collapsed={false}
                onItemClick={closeMobileSidebar}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}