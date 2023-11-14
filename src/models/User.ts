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

// userSchema.pre('save', async function (next) {
// 	const user = this as UserDocument;

// 	if (user.isModified('password') || user.isNew) {
// 		const salt = await bcrypt.genSalt(10);
// 		const hash = await bcrypt.hash(user.password, salt);
// 		user.password = hash;
// 	}
// 	next();
// });

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
