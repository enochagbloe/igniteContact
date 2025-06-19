import { model, models, Schema } from "mongoose";
export interface IUser{
    name: string;
    email: string;
    password: string;
    username: string;
    bio: string;
    avata: string;
    location: string;
    reputation: number;
}

// create a schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    bio: { type: String, required: true },
    avata:{ type: String, required: true },
    location: { type: String},
    reputation: { type: Number, default: 0 },
}, {
    timestamps: true
});

const User = models?.user || model<IUser>("user", UserSchema);
export default User;