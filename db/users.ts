import prisma from "@app/lib/prisma";
import { cache } from "react";
import { User } from "@prisma/client";

export const getUser = cache(async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
});

export const getUserByEmail = cache(
  async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },
);
