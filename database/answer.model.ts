// Create answer Schema

import { models, Schema, model, Types } from "mongoose";

export interface IAnswer {
    //fix bug
  questionId: Types.ObjectId;
  userId: Types.ObjectId;
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
