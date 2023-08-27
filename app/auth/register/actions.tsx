"use server";

import { getUserByEmail } from "@app/db/users";
import { registerSchema } from "@app/requests/auth";
import z from "zod";
import bcrypt from "bcrypt";
import prisma from "@app/lib/prisma";

interface SuccessfulRegisterResponse {
  success: true;
}

interface FailedRegisterResponse {
  success: false;
  errors: string[];
}

type RegisterResponse = SuccessfulRegisterResponse | FailedRegisterResponse;

export async function handleRegister(
  rawData: z.infer<typeof registerSchema>,
): Promise<RegisterResponse> {
  const data = registerSchema.parse(rawData);
  let existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    return {
      success: false,
      errors: ["Email is already registered"],
    };
  }

  let password = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: {
      email: data.email,
      password: password,
      name: data.username,
    },
  });

  return { success: true };
}
