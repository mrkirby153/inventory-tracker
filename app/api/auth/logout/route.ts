import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log("YAY")
    const response = new NextResponse("OK", {
        status: 200,
    });

    await Promise.all([
        response.cookies.set({
            name: "token",
            value: "",
            maxAge: -1,
        })
    ]);

    return response;
}