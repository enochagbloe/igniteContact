import { NextResponse } from "next/server";

interface Tag {
    _id: string;
    name: string;
}

interface Author {
    _id: string;
    name: string;
    image: string;
    value: string;
}

interface Question {
    _id: string;
    title: string;
    content: string;
    tags: Tag[];
    author: Author;
    createdAt: Date;
    upvotes: number;
    downvotes: number;
    views: number;
    answers: number;
}

// devotions 
export type Devotion = {
    scriptureCard?: boolean
     slug: string;
      title: string;
      date: string; // ISO string
      scripture: string; // e.g. "John 3:16"
      excerpt: string;
      content?: string; // full content for detail page
      tags: string[];
      author: {
        name: string;
        avatarUrl?: string;
      };
    };

    export type VerseOfTheDay = {
        title: string;
        scripture: string;
        scriptureContent: string;
        imageUrl: string ;
    };

// create and read userRoutes
type ActionResponse<T = null> ={
    success: boolean;
    data?: T;
    error?: {
        message: string;
        details?: string;
    },
    status?: number;
}

// A Successful Response
type SuccessResponse<T> = ActionResponse<T> & {
    success: true;
}

//error response
type ErrorResponse = ActionResponse & {
    success: false;
//     error: {
//         message: string;
//         details?: string;
//     };
}

// API error response
type APIErrorResponse = NextResponse<ErrorResponds> 
// regular api response
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse >