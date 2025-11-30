// src/inngest/handler.ts
import { serve } from "inngest/express";
import { inngest } from "./client";
import { userCreatedFn } from "./functions/userCreated";

export const inngestHandler = serve({
  client: inngest,
  functions: [userCreatedFn],
});
