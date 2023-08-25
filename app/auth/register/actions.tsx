"use server";

import { registerSchema } from "@app/requests/auth";

export async function handleRegister(formData: FormData) {
  let data = Object.fromEntries(formData);
  registerSchema.parse(data);
  console.log(data);
}