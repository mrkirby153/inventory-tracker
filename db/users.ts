import prisma from "@app/lib/prisma";
import { cache } from "react";

export const getUser = cache(async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
});

export const getUserByEmail = cache(async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
});
