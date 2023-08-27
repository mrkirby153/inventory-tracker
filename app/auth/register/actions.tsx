"use server";

import { registerSchema } from "@app/requests/auth";
import z from "zod";

export async function handleRegister(data: z.infer<typeof registerSchema>) {
  console.log("handleRegister!");
  console.log("data", data);
}
