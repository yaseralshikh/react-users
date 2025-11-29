import type { User } from "../api/users";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return <p>No users yet. Add one using the form below.</p>;
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "1rem",
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Role</th>
          <th style={thStyle}>Created</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td style={tdStyle}>{user.id}</td>
            <td style={tdStyle}>{user.name}</td>
            <td style={tdStyle}>{user.email}</td>
            <td style={tdStyle}>{user.role}</td>
            <td style={tdStyle}>
              {new Date(user.createdAt).toLocaleString()}
            </td>
            <td style={tdStyle}>
              <button onClick={() => onEdit(user)} style={{ marginRight: 8 }}>
                Edit
              </button>
              <button onClick={() => onDelete(user)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle: React.CSSProperties = {
  borderBottom: "1px solid #ccc",
  textAlign: "left",
  padding: "0.5rem",
};

const tdStyle: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  padding: "0.5rem",
};
