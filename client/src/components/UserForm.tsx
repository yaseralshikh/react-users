import { type FormEvent, useState, useEffect } from "react";
import type { Role, User, UserInput } from "../api/users";

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
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "0.5rem", minWidth: "360px" }}
    >
      {error && (
        <p style={{ color: "red", marginBottom: "0.5rem" }}>{error}</p>
      )}

      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Name:
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            style={{ width: "100%", padding: "0.25rem" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Email:
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            style={{ width: "100%", padding: "0.25rem" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label>
          Role:
          <br />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            disabled={submitting}
            style={{ width: "100%", padding: "0.25rem" }}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        {onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={submitting}
          >
            Cancel
          </button>
        )}
        <button type="submit" disabled={submitting}>
          {submitting
            ? "Saving..."
            : mode === "create"
            ? "Create"
            : "Update"}
        </button>
      </div>
    </form>
  );
}
