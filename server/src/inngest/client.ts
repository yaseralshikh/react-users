// src/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "react-users-app", // اسم تطبيقك في Inngest (يمكن تغييره لاحقًا)
});

/**
 * دالة مساعدة لإرسال حدث user/created
 * إذا لم يكن INNGEST_EVENT_KEY موجود في .env نكتفي بـ console.log
 */
export async function sendUserCreatedEvent(user: {
  id: number | string;
  name: string;
  email: string;
  role: string;
}) {
  if (!process.env.INNGEST_EVENT_KEY) {
    console.log(
      "[Inngest] INNGEST_EVENT_KEY not set; skipping send. User:",
      user
    );
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
