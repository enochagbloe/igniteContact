import { model, models, Schema, Types } from "mongoose";
export interface IInteraction {
    user: Types.ObjectId,
    action: string,
    actionId: Types.ObjectId,
    actionType: string
}
const InteractionSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
   action:{ type: String, required: true }, 
   actionId:{ type: Schema.Types.ObjectId, required: true },
   actionType:{ enum: ["question", "answer"], type: String, required: true },
},{ timestamps: true });

const Interactions = models?.interaction || model<IInteraction>("collection",InteractionSchema)
export default Interactions