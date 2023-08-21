import { NextResponse } from "next/server";
import { getUserByEmail } from "@app/db/users";
import bcrypt from "bcrypt";
import { signJWT } from "@app/auth/jwt";
import { loginRequestSchema } from "@app/requests/auth";
import { zodError } from "@app/requests";


function loginError() {
    return NextResponse.json({
        "formErrors": [],
        "fieldErrors": {
            "email": ["Invalid email or password"],
        }
    }, { status: 401 })
}

export async function POST(request: Request) {
    let result = loginRequestSchema.safeParse(await request.json());

    if (!result.success) {
        return zodError(result);
    }
    let data = result.data;
    let user = await getUserByEmail(data.email)
    if (user == null) {
        return loginError()
    }
    let match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        return loginError()
    }
    const token = await signJWT({ sub: user.id }, { exp: "60m" });
    const cookie = {
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60
    }
    const response = NextResponse.json({ "status": "success", "token": token })
    await response.cookies.set(cookie);
    return response;
}