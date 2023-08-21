import { cookies, headers } from "next/headers";

import { verifyJWT } from "./jwt";
import { getUser } from "@app/db/users";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getCurrentUser = cache(async (requireValidUser: boolean = true) => {
  let token: string | undefined;
  const cookieStore = cookies();
  const allHeaders = headers();
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
    if (requireValidUser) redirect("/auth/login");
  }
  let user = await getUser(sub);
  if (requireValidUser && !user) {
    redirect("/auth/login");
  }
  return user;
});
