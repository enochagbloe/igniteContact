import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http.error";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const { id } = await params;
  if (!id) throw new NotFoundError("user");

  try {
    await dbConnect();
    const user = await User.findOne({ _id: id });
    if (!user) throw new NotFoundError("user");

    return NextResponse.json({ success: true, data:user });
  } catch (error) {
    return handleError(error, "api");
  }
}

// Delete the user
export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = await params;
  if (!id) throw new NotFoundError("user");

  try {
    await dbConnect();
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError("user");

    return NextResponse.json({ success: true, data:user, status:200})
  } catch (error) {
    return handleError(error, "api");
  }
}

//Update a user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("user");

  try {
    await dbConnect();
    const body = await request.json();
    const validateDate = UserSchema.partial().parse(body);
    const existingUser = await User.findByIdAndUpdate(id, validateDate, {
      new: true,
    });
    if (!existingUser) throw new NotFoundError("user");

    return NextResponse.json({ success:true, data:existingUser, status:200})
  } catch (error) {
    return handleError(error, "api");
  }
}
