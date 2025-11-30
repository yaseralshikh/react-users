// src/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "react-users-app",
});

const EVENT_KEY = process.env.INNGEST_EVENT_KEY;

/**
 * دالة مساعدة لإرسال حدث user/created
 * في وضع التطوير (بدون Event Key حقيقي) سنكتفي بالـ console.log
 */
export async function sendUserCreatedEvent(user: {
  id: number | string;
  name: string;
  email: string;
  role: string;
}) {
  // إذا لا يوجد مفتاح حقيقي، نطبع فقط ولا نرسل لأي مكان
  if (!EVENT_KEY || EVENT_KEY === "dev-local-key") {
    console.log("[Inngest DEV] Simulating user/created event:", user);
    return;
  }

  try {
    await inngest.send({
      name: "user/created",
      data: { user },
    });
    console.log("[Inngest] Sent user/created event for user:", user.id);
  } catch (err) {
    console.error("[Inngest] Failed to send user/created event:", err);
  }
}
