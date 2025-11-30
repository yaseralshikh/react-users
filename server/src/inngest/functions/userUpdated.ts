// src/inngest/functions/userUpdated.ts
import { inngest } from "../client";

export const userUpdatedFn = inngest.createFunction(
  { id: "user-updated-logger" },   // اسم الـ function داخل Inngest
  { event: "user/updated" },       // 👈 نفس اسم الحدث الذي نرسله من API
  async ({ event, step }) => {
    const user = event.data.user;

    await step.run("log-user-updated", async () => {
      console.log(
        `✏️ Inngest: User updated: ${user.id} - ${user.name} (${user.email})`
      );
    });

    return { ok: true, message: "User update logged"};
  }
);
