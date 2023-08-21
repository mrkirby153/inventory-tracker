import { cookies, headers } from "next/headers";

import { verifyJWT } from "./jwt";
import { getUser } from "@app/db/users";
import { redirect } from "next/navigation";

export async function getCurrentUser(requireValidUser: boolean = true) {
    let token: string | undefined
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
    const { sub } = await verifyJWT<{ sub: string }>(token);
    let user = await getUser(sub);
    if (requireValidUser && !user) {
        redirect("/auth/login");
    }
    return user;
}