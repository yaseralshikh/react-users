// src/inngest/functions/userCreated.ts
import { inngest } from "../client";

export const userCreatedFn = inngest.createFunction(
  { id: "user-created-logger" },
  { event: "user/created" }, // 👈 نفس اسم الـ event اللي يظهر في UI
  async ({ event, step }) => {
    const user = event.data.user;

    await step.run("log-user-created", async () => {
      console.log("👋 Inngest function triggered for user:", user);
    });

    return { ok: true };
  }
);
