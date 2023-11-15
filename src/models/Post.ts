import mongoose, { Document, Schema } from 'mongoose';

interface PostDocument extends Document {
	title: string;
	content: string;
	author: mongoose.Schema.Types.ObjectId;
}

const postSchema = new Schema<PostDocument>({
	title: { type: String, required: true },
	content: { type: String, required: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Post = mongoose.model<PostDocument>('Post', postSchema);
export default Post;
