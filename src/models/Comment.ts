import mongoose, { Document, Schema } from 'mongoose';

interface CommentDocument extends Document {
	content: string;
	author: mongoose.Schema.Types.ObjectId;
	post: mongoose.Schema.Types.ObjectId;
}

const commentSchema = new Schema<CommentDocument>({
	content: { type: String, required: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
});

const Comment = mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment;
