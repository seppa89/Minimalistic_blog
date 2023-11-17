import mongoose, { Document, PassportLocalModel, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface UserDocument extends Document {
	username: string;
}

interface UserModel extends PassportLocalModel<UserDocument> {}

export const userSchema = new Schema<UserDocument>({
	username: { type: String, unique: true, required: true },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
