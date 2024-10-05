import mongoose, { Schema, Document, Model } from 'mongoose';
// Interface
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

// Schema
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

// Model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;