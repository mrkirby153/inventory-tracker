import { NextResponse } from "next/server";
import { getUserByEmail } from "@app/db/users";
import bcrypt from "bcrypt";
import { signJWT } from "@app/auth/jwt";


function loginError() {
    return NextResponse.json({
        "error": "Could not find user with that email and password combination"
    }, { status: 401 })
}

export async function POST(request: Request) {
    let json = await request.json()
    if (json.email == null || json.password == null) {
        return NextResponse.json({
            "error": "Missing email or password"
        }, { status: 400 })
    }
    let user = await getUserByEmail(json.email)
    if (user == null) {
        return loginError()
    }
    let match = await bcrypt.compare(json.password, user.password)
    if (match) {
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
        await Promise.all([
            response.cookies.set(cookie)
        ])
        return response;

    } else {
        return loginError()
    }
}