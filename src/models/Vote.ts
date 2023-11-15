import mongoose, { Document, Schema } from 'mongoose';

interface VoteDocument extends Document {
	user: mongoose.Schema.Types.ObjectId;
	post?: mongoose.Schema.Types.ObjectId;
	comment?: mongoose.Schema.Types.ObjectId;
}

const voteSchema = new Schema<VoteDocument>({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
	comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
});

const Vote = mongoose.model<VoteDocument>('Vote', voteSchema);

export default Vote;
