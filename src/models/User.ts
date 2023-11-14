import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
	username: string;
	password: string;
}

const userSchema = new Schema<UserDocument>({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
	const user = this as UserDocument;

	if (user.isModified('password') || user.isNew) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
	}
	next();
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
