import Account from "@/database/account.model";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http.error";
import dbConnect from "@/lib/mongoose";
import { signInWithOAuthSchema } from "@/lib/validation";
import { APIResponse } from "@/types/globals";
import mongoose from "mongoose";
import slugify from "slugify";

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();

  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validation = signInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });

    if (!validation.success)
      throw new ValidationError(validation.error.flatten().fieldErrors);

    const { name, email, username, image } = user;

    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    let existingUser = await User.findOne({ email }).session(session);

    if (!existingUser) {
      [existingUser] = await User.create([
        { name, username: slugifiedUsername, email, image },
      ]);
    } else {
      const updatedData: { name?: string; image?: string } = {};
      if (existingUser.name !== name) updatedData.name = name;
      if (existingUser.image !== image) updatedData.image = image;

      if (Object.keys(updatedData).length > 0)
        await User.updateOne(
          { _id: existingUser._id },
          { $set: updatedData }
        ).session(session);
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session }
      );
    }
    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction();
    return handleError(error, "api") as APIResponse;
  } finally {
    await session.endSession();
  }
}
