// src/components/UserForm.tsx
import { type FormEvent, useState, useEffect } from "react";
import type { Role, User, UserInput } from "../../api/users";

interface UserFormProps {
  mode: "create" | "edit";
  initialUser?: User;
  onSubmit: (data: UserInput) => Promise<void> | void;
  onCancelEdit?: () => void;
}

export function UserForm({
  mode,
  initialUser,
  onSubmit,
  onCancelEdit,
}: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("USER");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && initialUser) {
      setName(initialUser.name);
      setEmail(initialUser.email);
      setRole(initialUser.role);
    } else {
      setName("");
      setEmail("");
      setRole("USER");
    }
  }, [mode, initialUser]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), email: email.trim(), role });
      if (mode === "create") {
        setName("");
        setEmail("");
        setRole("USER");
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit form");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-3 min-w-[320px]">
      {error && <p className="text-sm text-red-500 mb-1">{error}</p>}

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Name
        </label>
        <input
          type="text"
          value={name}
          disabled={submitting}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Email
        </label>
        <input
          type="email"
          value={email}
          disabled={submitting}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Role
        </label>
        <select
          value={role}
          disabled={submitting}
          onChange={(e) => setRole(e.target.value as Role)}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={submitting}
            className="rounded border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary-700 disabled:opacity-70"
        >
          {submitting ? "Saving..." : mode === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
}
