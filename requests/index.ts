import { z } from "zod";
import { NextResponse } from "next/server";

export function zodError<Input>(result: z.SafeParseError<Input>) {
    return NextResponse.json(result.error.flatten(), { status: 400 });
}