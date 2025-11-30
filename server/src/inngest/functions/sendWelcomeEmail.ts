// src/inngest/functions/sendWelcomeEmail.ts

import { inngest } from "../client";

export const sendWelcomeEmailFn = inngest.createFunction(
  { id: "send-welcome-email" },          // اسم الوظيفة داخل Inngest
  { event: "user/created" },             // يتم تشغيلها على نفس الحدث
  async ({ event, step }) => {
    const user = event.data.user;

    // الخطوة الرئيسية: إرسال بريد ترحيبي
    await step.run("send-welcome-email", async () => {
      console.log(
        `📧 Sending welcome email to ${user.email}...`
      );

      // ================================
      // 📌 محاكاة إرسال البريد (Mock)
      // ================================
      // هنا كود الإرسال الحقيقي (Resend / SendGrid / SES / Mailgun)
      // يمكنك استبداله لاحقًا بسهولة

      await new Promise((resolve) => setTimeout(resolve, 1200)); // محاكاة التأخير

      console.log(
        `🎉 Welcome email successfully sent to ${user.email}!`
      );
    });

    return {
      ok: true,
      message: "Welcome email sent",
      email: user.email,
    };
  }
);
