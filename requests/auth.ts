import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z
  .object({
    username: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    passwordConfirm: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
