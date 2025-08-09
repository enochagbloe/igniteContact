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

//API Responses
type APIResponse = NextResponse<ErrorResponse>

//regular api response
type APIResponse<T = null> = NextResponse<SuccessResponse<T>> | ErrorResponse;
