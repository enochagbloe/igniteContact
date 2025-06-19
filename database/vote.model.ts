// create a vote Schema model

import { Schema, models, model, Types } from "mongoose";

interface IVote {
    author: Types.ObjectId;
    Id: string;
    types: string;
    voteTypes: number;
}
const VoteScheme = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    Id: { type: Schema.Types.ObjectId, required: true },
    types: { type: String, enum: ["answer", "question"], required: true },
    voteTypes: { type: Number, enum: [ "upvotes", "downvotes"],required: true },
}, { timestamps: true });

const Vote = models?.vote || model<IVote>("vote", VoteScheme);
export default Vote;