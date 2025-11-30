// src/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "react-users-app",
});

// دوال لإرسال الأحداث إلى Inngest
// 🆕 حدث لإنشاء مستخدم جديد
export async function sendUserCreatedEvent(user: {
  id: number | string;
  name: string;
  email: string;
  role: string;
}) {
  await inngest.send({
    name: "user/created",
    data: { user },
  });
  console.log("[Inngest] Sent user/created event", user);
}

// 🆕 حدث جديد لتحديث المستخدم
export async function sendUserUpdatedEvent(user: {
  id: number | string;
  name: string;
  email: string;
  role: string;
}) {
  await inngest.send({
    name: "user/updated", // 👈 اسم الحدث الجديد
    data: { user },
  });
  console.log("[Inngest] Sent user/updated event", user);
}

// حدث جديد لحذف مستخدم
export async function sendUserDeletedEvent(user: {
  id: number | string;
  name: string;
  email: string;
  role: string;
}) {
  await inngest.send({
    name: "user/deleted", // 👈 اسم الحدث الجديد
    data: { user },
  });
  console.log("[Inngest] Sent user/deleted event", user);
}