import { model, models, Schema } from "mongoose";
//Inter face the AccountSchema
export interface IAccount {
    userId: string;
    name: string;
    email: string;
    username: string;
    image: string;
    provider: string;
    providerAccountId: string;
}
export interface IAccountDoc extends IAccount, Document {}

// create an Account Schema
const AccountScheme = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String, required: true },
    provider: { type: String, enum: ["github", "google"], required: true },
    providerAccountId: { type: String, required: true },
}, { timestamps: true });

const Account = models?.account || model<IAccount>("account", AccountScheme);
export default Account;