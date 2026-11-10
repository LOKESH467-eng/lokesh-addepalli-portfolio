import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator(contactSubmissionSchema)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert(data);

    if (error) {
      console.error("Unable to save contact submission", error.message);
      throw new Error("Your message could not be sent. Please try again.");
    }

    return { ok: true };
  });