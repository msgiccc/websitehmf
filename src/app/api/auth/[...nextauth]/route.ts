import { handlers } from "@/auth";
import { NextResponse } from "next/server";

const { GET: AuthGET, POST: AuthPOST } = handlers;

// Helper: Fix URL cacat akibat salah ketik di Vercel Env (misal: "domain.com" alih-alih "https://domain.com")
function ensureValidAuthUrl(req: any) {
    try {
        // Ambil origin asli dari request Vercel
        const origin = req.nextUrl?.origin || "https://hmfupi.vercel.app";

        ['AUTH_URL', 'NEXTAUTH_URL'].forEach((key) => {
            const val = process.env[key];
            if (val && !val.startsWith('http://') && !val.startsWith('https://')) {
                // Fix otomatis URL yang gak ada protokol-nya jadi https://
                process.env[key] = `https://${val}`;
                console.log(`[NextAuth Fix] Fixed invalid env ${key} to: ${process.env[key]}`);
            } else if (!val) {
                // Fallback otomatis
                process.env[key] = origin;
            }
        });
    } catch (e) {
        // Abaikan jika error
        console.error("URL Fixer error:", e);
    }
}

export async function GET(req: any) {
    try {
        ensureValidAuthUrl(req);
        const response = await AuthGET(req);
        return response;
    } catch (e: any) {
        console.error("NextAuth GET Error:", e);
        return NextResponse.json({
            error_message: e.message,
            error_stack: e.stack,
            error_name: e.name,
            debug_auth_url: process.env.AUTH_URL,
            debug_nextauth_url: process.env.NEXTAUTH_URL,
            debug_req_url: req.url
        }, { status: 500 });
    }
}

export async function POST(req: any) {
    try {
        ensureValidAuthUrl(req);
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
