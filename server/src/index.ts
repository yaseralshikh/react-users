import { inngestHandler } from "./inngest/handler";
import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import usersRouter from "./routes/users";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Simple health check route
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Test Prisma route
app.get("/test-prisma", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      message: "Prisma is working!",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error in /test-prisma:", error);
    res.status(500).json({ error: "Something went wrong with Prisma" });
  }
});

// Mount users API
app.use("/api/users", usersRouter);

// Endpoint خاص بـ Inngest (سيستخدم لاحقًا بواسطة Inngest Dev Server أو Inngest Cloud)
app.use("/api/inngest", inngestHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
