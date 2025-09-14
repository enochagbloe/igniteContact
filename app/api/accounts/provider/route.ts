import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http.error";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/globals";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { providerAccountId } = await req.json();

    try {
        const account = AccountSchema.partial().safeParse({ providerAccountId });
        if (!account.success) {
            throw new ValidationError(account.error.flatten().fieldErrors);
        }
        const user = await Account.findOne({ providerAccountId });
        if (!user) {
            throw new Error("Account does not exist");
        }
        return NextResponse.json({ success: true, data: account.data, status: 201 });
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}