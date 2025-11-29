// src/pages/UsersPage.tsx
import { useEffect, useState, type ChangeEvent } from "react";
import {
  type User,
  type UserInput,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/users";
import { UserTable } from "../components/UserTable";
import { UserForm } from "../components/UserForm";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      showSnackbar(err.message || "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateUser(input: UserInput) {
    const newUser = await createUser(input);
    setUsers((prev) => [newUser, ...prev]);
    showSnackbar("User created successfully", "success");
  }

  async function handleUpdateUser(input: UserInput) {
    if (!editingUser) return;
    const updated = await updateUser(editingUser.id, input);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    showSnackbar("User updated successfully", "success");
  }

  // Delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  function openDeleteDialog(user: User) {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  }
  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  }

  async function confirmDeleteUser() {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.id);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      showSnackbar("User deleted successfully", "success");
    } catch (err: any) {
      showSnackbar(err.message || "Failed to delete user", "error");
    } finally {
      closeDeleteDialog();
    }
  }

  // Form dialog
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  function openCreateDialog() {
    setEditingUser(null);
    setFormDialogOpen(true);
  }

  function openEditDialog(user: User) {
    setEditingUser(user);
    setFormDialogOpen(true);
  }

  function closeFormDialog() {
    setFormDialogOpen(false);
    setEditingUser(null);
  }

  async function handleSubmitFromDialog(input: UserInput) {
    if (editingUser) {
      await handleUpdateUser(input);
    } else {
      await handleCreateUser(input);
    }
    closeFormDialog();
  }

  // Search filter
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Users
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage your users (create, edit, delete) using the API-backed table.
          </p>
        </div>

        {/* Search + Add User alignment */}
        <div className="flex w-full gap-2 sm:w-auto sm:min-w-[320px]">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 rounded border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
          />
          <Button
            variant="contained"
            onClick={openCreateDialog}
            className="!text-xs !normal-case !bg-primary-600 hover:!bg-primary-700"
          >
            Add User
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading users...</p>
      ) : (
        <UserTable
          users={filteredUsers}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
        />
      )}

      {/* DELETE WARNING DIALOG */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        PaperProps={{
          sx: {
            padding: 2,
            borderRadius: 2,
            minWidth: "380px",
          },
        }}
      >
        <DialogContent sx={{ textAlign: "center", paddingBottom: 0 }}>
          <div style={{ marginBottom: "12px" }}>
            <svg width="48" height="48" fill="#f44336" viewBox="0 0 24 24">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-8h-2v6h2v-6z" />
            </svg>
          </div>

          <h2 style={{ margin: "0 0 8px", fontSize: "20px" }}>
            Confirm Delete
          </h2>

          <p style={{ fontSize: "15px", color: "#555", marginBottom: "12px" }}>
            Are you sure you want to delete user <b>{userToDelete?.name}</b>?
            This action cannot be undone.
          </p>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          <Button
            onClick={closeDeleteDialog}
            variant="outlined"
            sx={{ borderRadius: 1, paddingX: 3 }}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={confirmDeleteUser}
            sx={{ borderRadius: 1, paddingX: 3 }}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* USER FORM DIALOG - Modal متناسق */}
      <Dialog
        open={formDialogOpen}
        onClose={closeFormDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            paddingY: 1,
          },
        }}
      >
        <DialogTitle className="text-base font-semibold text-slate-800">
          {editingUser ? "Edit User" : "Create New User"}
        </DialogTitle>
        <DialogContent>
          <UserForm
            mode={editingUser ? "edit" : "create"}
            initialUser={editingUser ?? undefined}
            onSubmit={handleSubmitFromDialog}
            onCancelEdit={closeFormDialog}
          />
        </DialogContent>
      </Dialog>

      {/* SNACKBAR NOTIFICATION */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
