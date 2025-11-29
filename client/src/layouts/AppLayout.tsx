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

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors">
        <Navbar
        onToggleSidebar={toggleSidebar}
        onToggleTheme={toggleTheme}
        theme={theme}
        sidebarCollapsed={sidebarCollapsed}
        />

        <div className="flex flex-1">
          <Sidebar collapsed={sidebarCollapsed} />

          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
