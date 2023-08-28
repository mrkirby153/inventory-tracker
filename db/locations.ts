import prisma from "@app/lib/prisma";
import { cache } from "react";
import { Location, User } from "@prisma/client";

export const getLocation = cache(
  async (id: string): Promise<Location | null> => {
    return prisma.location.findFirst({
      where: {
        id,
      },
    });
  },
);

export const getLocations = cache(async (user: User): Promise<Location[]> => {
  return prisma.location.findMany({
    where: {
      owner: user,
    },
  });
});
