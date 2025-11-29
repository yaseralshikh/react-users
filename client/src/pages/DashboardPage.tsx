export function DashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-800">
        Dashboard
      </h2>
      <p className="text-sm text-slate-600">
        This is a simple dashboard. You can reuse this layout (navbar, sidebar,
        footer) in future admin projects.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white shadow-sm p-4 border border-slate-100">
          <p className="text-xs text-slate-400 uppercase mb-1">
            Users
          </p>
          <p className="text-2xl font-semibold text-slate-800">
            Manage users
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Create, edit, and delete users from the Users section.
          </p>
        </div>

        <div className="rounded-lg bg-white shadow-sm p-4 border border-slate-100">
          <p className="text-xs text-slate-400 uppercase mb-1">
            Stack
          </p>
          <p className="text-sm text-slate-700">
            React, TypeScript, TailwindCSS, Prisma, Inngest, Render.
          </p>
        </div>

        <div className="rounded-lg bg-white shadow-sm p-4 border border-slate-100">
          <p className="text-xs text-slate-400 uppercase mb-1">
            Reusable
          </p>
          <p className="text-sm text-slate-700">
            Copy this layout into future projects as your default admin shell.
          </p>
        </div>
      </div>
    </div>
  );
}
