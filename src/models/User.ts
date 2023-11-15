import mongoose, { Document, PassportLocalModel, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import passportLocalMongoose from 'passport-local-mongoose';

interface UserDocument extends Document {
	username: string;
	password: string;
}

interface UserModel extends PassportLocalModel<UserDocument> {}

export const userSchema = new Schema<UserDocument>({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
