import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http.error";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIResponse } from "@/types/globals";
import { NextResponse } from "next/server";

// getting all users from the database
export async function GET() {
    try {
        await dbConnect();
        const users = await User.find();
        return NextResponse.json({ success: true, data: users }, { status: 200 });
    } catch (error) {
        return handleError(error, "api") as APIResponse
    }
}

// create users function
export async function POST(request: Request) {
    //CONNECT TO THE DATABASE
    try {
        await dbConnect();
        const body = await request.json();

        const validateData = UserSchema.safeParse(body);
        if (!validateData.success) {
            throw new ValidationError(validateData.error.flatten().fieldErrors);
        }
        // Destructure the validated data
        const { email, username } = validateData.data;
        // find the user's email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("User already exists");
        }
        // find the User's username
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            throw new Error("Username already exists");
        }

        const user = await User.create({ email, username });
        return NextResponse.json({ success: true, data: user }, { status: 201 });
    } catch (error) {
        return handleError(error, "api") as APIResponse;
    }
}