import { inngest } from "../client";

export const userDeletedFn = inngest.createFunction(
  { id: "user-deleted-logger" },   // اسم الـ function داخل Inngest
  { event: "user/deleted" },       // 👈 نفس اسم الحدث الذي نرسله من API
  async ({ event, step }) => {
    const user = event.data.user;
    await step.run("log-user-deleted", async () => {
      console.log(
        `🗑️ Inngest: User deleted: ${user.id} - ${user.name} (${user.email})`
      );
    });

    return { ok: true, message: "User deletion logged"};
  }
);