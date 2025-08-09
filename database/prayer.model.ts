import { model, models, Schema, Document } from "mongoose";

export interface IPrayer extends Document {
    title: string;
    description: string;
    category: string;
    isAnonymous: boolean;
    isPrivate: boolean;
    status: 'pending' | 'answered' | 'in_progress';
    author: Schema.Types.ObjectId;
    prayedBy: Schema.Types.ObjectId[];
    answeredAt?: Date;
    answeredDescription?: string;
    createdAt: Date;
    updatedAt: Date;
}

// create a schema
const PrayerSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['healing', 'guidance', 'protection', 'provision', 'salvation', 'family', 'work', 'ministry', 'other'],
        default: 'other'
    },
    isAnonymous: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    status: { 
        type: String, 
        enum: ['pending', 'answered', 'in_progress'],
        default: 'pending'
    },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    prayedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    answeredAt: { type: Date },
    answeredDescription: { type: String },
}, {
    timestamps: true
});

const Prayer = models?.Prayer || model<IPrayer>("Prayer", PrayerSchema);
export default Prayer;