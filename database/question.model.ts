import { model, models, Schema, Types } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  author: Types.ObjectId;
  views: number;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  answers: Types.ObjectId[];
}

const QuestionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
}, {
  timestamps: true
});

const Question = models?.Question || model<IQuestion>("Question", QuestionSchema);
export default Question;