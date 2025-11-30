// src/inngest/handler.ts
import { serve } from "inngest/express";
import { inngest } from "./client";
import { userCreatedFn } from "./functions/userCreated";
import { userUpdatedFn } from "./functions/userUpdated";
import { userDeletedFn } from "./functions/userDeleted";
import { sendWelcomeEmailFn } from "./functions/sendWelcomeEmail";

export const inngestHandler = serve({
  client: inngest,
  functions: [
    userCreatedFn,
    userUpdatedFn,
    userDeletedFn,
    sendWelcomeEmailFn
  ],
});
