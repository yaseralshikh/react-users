// src/inngest/index.ts
import { Inngest } from "inngest";

// 👈 1) إنشاء client
export const inngest = new Inngest({
  id: "react-users-app",
});

// 👈 2) تعريف الـ function التي تستمع لحدث user/created
export const userCreatedFn = inngest.createFunction(
  { id: "user-created-logger" },        // اسم واضح للـ function
  { event: "user/created" },            // اسم الحدث EXACT مثل الموجود في الـ Event
  async ({ event, step }) => {
    const user = event.data.user;

    await step.run("log-new-user", async () => {
      console.log(
        `👋 Inngest: New user created: ${user.id} - ${user.name} (${user.email})`
      );
    });

    return {
      ok: true,
      message: "User logged from Inngest function",
      user,
    };
  }
);

// 👈 3) مصفوفة الـ functions التي ستُمرَّر إلى serve()
export const functions = [userCreatedFn];
