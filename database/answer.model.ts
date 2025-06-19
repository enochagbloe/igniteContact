// Create answer Schema

import { models, Schema, model } from "mongoose";

export interface IAnswer {
  questionId: string;
  userId: string;
  answer: string;
}
const AnswerSchema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

const Answer = models?.answer || model<IAnswer>("answer", AnswerSchema);
export default Answer;
