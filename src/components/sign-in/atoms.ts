import { z } from "zod";

export const signInFormSchema = z.object({
  emailAddress: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
