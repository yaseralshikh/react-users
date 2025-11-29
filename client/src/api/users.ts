export type Role = "ADMIN" | "USER";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface UserInput {
  name: string;
  email: string;
  role: Role;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const USERS_URL = `${API_BASE_URL}/api/users`;

async function handleResponse(res: Response) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) {
        message = data.error;
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }
  return res.json();
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(USERS_URL);
  return handleResponse(res);
}

export async function getUser(id: number): Promise<User> {
  const res = await fetch(`${USERS_URL}/${id}`);
  return handleResponse(res);
}

export async function createUser(input: UserInput): Promise<User> {
  const res = await fetch(USERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse(res);
}

export async function updateUser(
  id: number,
  input: Partial<UserInput>
): Promise<User> {
  const res = await fetch(`${USERS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse(res);
}

export async function deleteUser(id: number): Promise<{ message: string }> {
  const res = await fetch(`${USERS_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
