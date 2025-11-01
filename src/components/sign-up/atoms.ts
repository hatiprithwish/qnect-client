import { z } from "zod";

export const signUpFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  emailAddress: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;

export const verificationCodeSchema = z.object({
  code: z.string().min(1, "Verification code is required"),
});

export type VerificationCodeData = z.infer<typeof verificationCodeSchema>;
