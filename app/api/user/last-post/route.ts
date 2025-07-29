import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Find the current user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Find the user's last question/post
    const lastQuestion = await Question.findOne({ author: user._id })
      .populate("tags", "name")
      .populate("author", "name username")
      .sort({ createdAt: -1 });

    if (!lastQuestion) {
      return NextResponse.json({
        message: "No posts found",
        lastPost: null
      });
    }

    return NextResponse.json({
      message: "Last post found",
      lastPost: {
        _id: lastQuestion._id,
        title: lastQuestion.title,
        content: lastQuestion.content,
        tags: lastQuestion.tags,
        author: lastQuestion.author,
        createdAt: lastQuestion.createdAt,
        views: lastQuestion.views,
        upvotes: lastQuestion.upvotes?.length || 0,
        answers: lastQuestion.answers?.length || 0
      }
    });

  } catch (error) {
    console.error("Error fetching last post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}