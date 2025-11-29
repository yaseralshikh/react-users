import type { User } from "../../api/users";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-300">
        No users yet. Click <span className="font-semibold">Add User</span> to
        create the first one.
      </p>
    );
  }

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden 
                    dark:bg-slate-900 dark:border-slate-700"
    >
      <table className="w-full border-collapse text-sm text-slate-800 dark:text-slate-100">
        <thead className="bg-slate-50 dark:bg-slate-800/70">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-300">
              ID
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-300">
              Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-300">
              Email
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-300">
              Role
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-300">
              Created
            </th>
            <th className="px-4 py-2 text-right text-xs font-semibold text-slate-500 dark:text-slate-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-slate-100 hover:bg-slate-50 
                         dark:border-slate-700 dark:hover:bg-slate-800/80"
            >
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                {new Date(user.createdAt).toLocaleString('en-GB', {
                  year: 'numeric',
                  month: 'numeric',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="inline-flex items-center rounded bg-slate-100 px-3 py-1 text-xs font-medium 
                             text-slate-700 hover:bg-slate-200
                             dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="inline-flex items-center rounded bg-red-500 px-3 py-1 text-xs font-medium 
                             text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
