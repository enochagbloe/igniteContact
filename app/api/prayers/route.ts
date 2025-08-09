import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Prayer from "@/database/prayer.model";
import handleError from "@/lib/handlers/error";

// GET - Fetch all prayer requests
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '10');
        const page = parseInt(searchParams.get('page') || '1');
        
        const query: Record<string, unknown> = { isPrivate: false }; // Only show public prayers
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        if (status && status !== 'all') {
            query.status = status;
        }
        
        const skip = (page - 1) * limit;
        
        const prayers = await Prayer.find(query)
            .populate('author', 'name image')
            .populate('prayedBy', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
            
        const totalPrayers = await Prayer.countDocuments(query);
        
        return NextResponse.json({
            prayers,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalPrayers / limit),
                totalPrayers,
                hasMore: skip + prayers.length < totalPrayers
            }
        });
        
    } catch (error) {
        return handleError(error) as NextResponse;
    }
}

// POST - Create new prayer request
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        
        const body = await request.json();
        const { title, description, category, isAnonymous, isPrivate, author } = body;
        
        if (!title || !description || !category || !author) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }
        
        const prayer = await Prayer.create({
            title,
            description,
            category,
            isAnonymous: isAnonymous || false,
            isPrivate: isPrivate || false,
            author,
            status: 'pending'
        });
        
        const populatedPrayer = await Prayer.findById(prayer._id)
            .populate('author', 'name image')
            .exec();
        
        return NextResponse.json(populatedPrayer, { status: 201 });
        
    } catch (error) {
        return handleError(error) as NextResponse;
    }
}