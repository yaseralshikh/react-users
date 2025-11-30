import { sendUserCreatedEvent } from "../inngest/client";
import express, { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = express.Router();

// Helper: parse id from params
function parseId(param: string): number | null {
  const id = Number(param);
  if (Number.isNaN(id) || id <= 0) {
    return null;
  }
  return id;
}

// GET /api/users - list all users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  } catch (error) {
    console.error("GET /api/users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET /api/users/:id - get one user
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("GET /api/users/:id error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// POST /api/users - create user
router.post("/", async (req: Request, res: Response) => {
  const { name, email, role } = req.body as {
    name?: string;
    email?: string;
    role?: "ADMIN" | "USER";
  };

  if (!name || !email) {
    return res
      .status(400)
      .json({ error: "name and email are required fields" });
  }

  const finalRole = role === "ADMIN" ? "ADMIN" : "USER";

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: finalRole,
      },
    });

    // إرسال حدث user/created إلى Inngest
    await sendUserCreatedEvent({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });


    res.status(201).json(user);
  } catch (error: any) {
    console.error("POST /api/users error:", error);

    // Prisma unique constraint violation (e.g. email already exists)
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    res.status(500).json({ error: "Failed to create user" });
  }
});

// PUT /api/users/:id - update user
router.put("/:id", async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  const { name, email, role } = req.body as {
    name?: string;
    email?: string;
    role?: "ADMIN" | "USER";
  };

  if (!name && !email && !role) {
    return res
      .status(400)
      .json({ error: "At least one field (name, email, role) must be provided" });
  }

  const updateData: any = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (role) updateData.role = role === "ADMIN" ? "ADMIN" : "USER";

  try {
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    res.json(user);
  } catch (error: any) {
    console.error("PUT /api/users/:id error:", error);

    if (error.code === "P2025") {
      // Record not found
      return res.status(404).json({ error: "User not found" });
    }

    if (error.code === "P2002") {
      // Unique constraint (email already used)
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    res.status(500).json({ error: "Failed to update user" });
  }
});

// DELETE /api/users/:id - delete user
router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });

    // 204 No Content is common; هنا نعيد رسالة بسيطة ليسهل الاختبار
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/users/:id error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
