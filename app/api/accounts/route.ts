import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http.error";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/globals";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const account = Account.find();

    return NextResponse.json({ success: true, data: account, status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const validateData = AccountSchema.safeParse(body);

    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }

    const existingAccount = await Account.findOne({
        provider: validateData.data.provider,
        providerAccountId: validateData.data.providerAccountId,
    })
    if (existingAccount) {
      throw new Error("Account already exists");
    }
    return NextResponse.json({ success: true, data: validateData.data, status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
