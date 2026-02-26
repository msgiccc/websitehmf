import { handlers } from "@/auth";
import { NextResponse } from "next/server";

const { GET: AuthGET, POST: AuthPOST } = handlers;

export async function GET(req: any) {
    try {
        const response = await AuthGET(req);
        return response;
    } catch (e: any) {
        console.error("NextAuth GET Error:", e);
        return NextResponse.json({
            error_message: e.message,
            error_stack: e.stack,
            error_name: e.name
        }, { status: 500 });
    }
}

export async function POST(req: any) {
    try {
        const response = await AuthPOST(req);
        return response;
    } catch (e: any) {
        console.error("NextAuth POST Error:", e);
        return NextResponse.json({
            error_message: e.message,
            error_stack: e.stack,
            error_name: e.name
        }, { status: 500 });
    }
}
