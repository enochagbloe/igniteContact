import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http.error";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIResponse } from "@/types/globals";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const user = User.find();

    return NextResponse.json({ success: true, data: user, status: true });
  } catch (error) {
    return handleError(error, "api") as APIResponse;
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = req.json();

    const validateData = UserSchema.safeParse(body);

    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }
  } catch (error) {
    return handleError(error, "api") as APIResponse;
  }
}
