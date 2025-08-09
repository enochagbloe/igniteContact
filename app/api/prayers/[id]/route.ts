import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Prayer from "@/database/prayer.model";
import handleError from "@/lib/handlers/error";

// GET - Fetch single prayer request
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        
        const { id } = await params;
        
        const prayer = await Prayer.findById(id)
            .populate('author', 'name image')
            .populate('prayedBy', 'name image')
            .exec();
            
        if (!prayer) {
            return NextResponse.json(
                { error: "Prayer request not found" },
                { status: 404 }
            );
        }
        
        // Only show private prayers to author or admin
        if (prayer.isPrivate) {
            // In a real app, you'd check authentication here
            // For now, we'll just return the prayer
        }
        
        return NextResponse.json(prayer);
        
    } catch (error) {
        return handleError(error) as NextResponse;
    }
}

// PATCH - Update prayer request (mark as answered, update status, add prayer)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        
        const { id } = await params;
        const body = await request.json();
        
        const prayer = await Prayer.findById(id);
        
        if (!prayer) {
            return NextResponse.json(
                { error: "Prayer request not found" },
                { status: 404 }
            );
        }
        
        // Handle different update types
        if (body.action === 'pray') {
            // Add user to prayedBy array
            if (!prayer.prayedBy.includes(body.userId)) {
                prayer.prayedBy.push(body.userId);
                await prayer.save();
            }
        } else if (body.action === 'answer') {
            // Mark prayer as answered
            prayer.status = 'answered';
            prayer.answeredAt = new Date();
            prayer.answeredDescription = body.answeredDescription;
            await prayer.save();
        } else if (body.action === 'update_status') {
            // Update prayer status
            prayer.status = body.status;
            await prayer.save();
        } else {
            // General update
            Object.assign(prayer, body);
            await prayer.save();
        }
        
        const updatedPrayer = await Prayer.findById(id)
            .populate('author', 'name image')
            .populate('prayedBy', 'name image')
            .exec();
        
        return NextResponse.json(updatedPrayer);
        
    } catch (error) {
        return handleError(error) as NextResponse;
    }
}

// DELETE - Delete prayer request
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        
        const { id } = await params;
        
        const prayer = await Prayer.findById(id);
        
        if (!prayer) {
            return NextResponse.json(
                { error: "Prayer request not found" },
                { status: 404 }
            );
        }
        
        // In a real app, check if user is author or admin
        
        await Prayer.findByIdAndDelete(id);
        
        return NextResponse.json(
            { message: "Prayer request deleted successfully" },
            { status: 200 }
        );
        
    } catch (error) {
        return handleError(error) as NextResponse;
    }
}