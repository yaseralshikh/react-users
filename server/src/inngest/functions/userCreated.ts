// src/inngest/functions/userCreated.ts
import { inngest } from "../client";

export const userCreatedFn = inngest.createFunction(
  { id: "user-created-logger" },
  { event: "user/created" },
  async ({ event, step }) => {
    await step.run("log-user-created", async () => {
      console.log("[Inngest Function] user/created event received:", {
        id: event.data.user.id,
        name: event.data.user.name,
        email: event.data.user.email,
        role: event.data.user.role,
      });
    });

    return { success: true };
  }
);
