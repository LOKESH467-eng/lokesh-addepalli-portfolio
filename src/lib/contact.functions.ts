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
    try {
      const response = await fetch("https://portfolio-contact-form-seven.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Contact API returned an unsuccessful response");
      }
    } catch {
      throw new Error("Your message could not be sent. Please try again.");
    }

    return { ok: true };
  });