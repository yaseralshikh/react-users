import { useEffect, useState } from "react";
import {
  type User,
  type UserInput,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/users";
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

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<"success" | "error" | "info" | "warning">("info");

  function showSnackbar(message: string, severity: "success" | "error" | "info" | "warning") {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // ---------------------------
  // تحميل المستخدمين
  // ---------------------------
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
    }
    setLoading(false);
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

  // ---------------------------
  // Delete Warning Dialog
  // ---------------------------
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

  // ---------------------------
  // User Form Dialog (Create / Edit)
  // ---------------------------
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

  return (
    <div>
      <h2>Users</h2>

      <div style={{ marginBottom: "1rem" }}>
        <Button variant="contained" onClick={openCreateDialog}>
          Add User
        </Button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <UserTable
          users={users}
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
        <DialogContent
          sx={{ textAlign: "center", paddingBottom: 0 }}
        >
          <div style={{ marginBottom: "12px" }}>
            <svg
              width="48"
              height="48"
              fill="#f44336"
              viewBox="0 0 24 24"
            >
              <path d="M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-8h-2v6h2v-6z" />
            </svg>
          </div>

          <h2 style={{ margin: "0 0 8px", fontSize: "20px" }}>
            Confirm Delete
          </h2>

          <p style={{ fontSize: "15px", color: "#555", marginBottom: "12px" }}>
            Are you sure you want to delete user{" "}
            <b>{userToDelete?.name}</b>? This action cannot be undone.
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

      {/* USER FORM DIALOG */}
      <Dialog
        open={formDialogOpen}
        onClose={closeFormDialog}
        PaperProps={{
          sx: {
            paddingX: 2,
            paddingY: 1,
            borderRadius: 2,
            minWidth: "420px",
          },
        }}
      >
        <DialogTitle>
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
