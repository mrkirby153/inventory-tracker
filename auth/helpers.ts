import { cookies, headers } from "next/headers";

import { verifyJWT } from "./jwt";
import { getUser } from "@app/db/users";

export async function getCurrentUser() {
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
    return await getUser(sub);
}