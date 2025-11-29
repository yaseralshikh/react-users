// src/components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="h-10 flex items-center justify-center text-xs text-slate-500 bg-slate-300 dark:bg-slate-950 border-t border-slate-200">
      <span>
        &copy; {new Date().getFullYear()} User Management Demo · Built with{" "}
        <span className="font-semibold">React + Tailwind</span>
      </span>
    </footer>
  );
}
