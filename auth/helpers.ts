import { cookies, headers } from "next/headers";

import { verifyJWT } from "./jwt";
import { getUser } from "@app/db/users";
import { redirect } from "next/navigation";
import { cache } from "react";
import { User } from "@prisma/client";

export const optionallyGetCurrentUser = cache(
  async (): Promise<User | null> => {
    let token: string | undefined;
    const cookieStore = await cookies();
    const allHeaders = await headers();
    if (cookieStore.has("token")) {
      token = cookieStore.get("token")?.value;
    } else if (allHeaders.has("Authorization")) {
      token = allHeaders.get("Authorization")?.substring(7);
    }
    if (!token) {
      return null;
    }
    let sub: string = "";
    try {
      sub = (await verifyJWT<{ sub: string }>(token)).sub;
    } catch (error) {
      return null;
    }
    let user = await getUser(sub);
    if (!user) {
      return null;
    }
    return user;
  },
);

export const getCurrentUser = cache(async (): Promise<User> => {
  let user = await optionallyGetCurrentUser();
  if (user == null) {
    redirect("/auth/login");
  }
  return user;
});
