// create a tag Schema

import { model, models, Schema } from "mongoose"
export interface ITag {
    name: string,
    question: string
}

const TagSchema = new Schema({
    name: { type: String, required: true },
    question: { type: String, required: true },
}, { timestamps: true });

const Tag = models?.tag || model<ITag>("tag", TagSchema);
export default Tag;