import DbConnect from "@/helpers/DbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    DbConnect();
    try {
        return NextResponse.json(
            { success: true, message: "Api Working fine" },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            {
                success: false,
                message: JSON.stringify(err),
            },
            { status: 500 }
        );
    }
}
