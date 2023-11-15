import { Request, Response } from 'express';
import Comment from '../models/Comment';

const CommentController = {
	getAllCommentsForPost: async (
		req: Request<{ postId: string }>,
		res: Response
	) => {
		try {
			const comments = await Comment.find({ post: req.params.postId });
			res.json(comments);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},

	createComment: async (
		req: Request<{ postId: string }, any, { content: string }>,
		res: Response
	) => {
		try {
			const { content } = req.body;
			const newComment = new Comment({
				content,
				author: req?.user?._id,
				post: req.params.postId,
			});
			await newComment.save();
			res.json({ success: true, message: 'Comment created successfully.' });
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ success: false, message: 'Comment creation failed.' });
		}
	},

	updateComment: async (
		req: Request<{ commentId: string }, any, { content: string }>,
		res: Response
	) => {
		try {
			const { content } = req.body;
			await Comment.findByIdAndUpdate(req.params.commentId, { content });
			res.json({ success: true, message: 'Comment updated successfully.' });
		} catch (error) {
			res
				.status(500)
				.json({ success: false, message: 'Comment update failed.' });
		}
	},

	deleteComment: async (req: Request<{ commentId: string }>, res: Response) => {
		try {
			await Comment.findByIdAndDelete(req.params.commentId);
			res.json({ success: true, message: 'Comment deleted successfully.' });
		} catch (error) {
			res
				.status(500)
				.json({ success: false, message: 'Comment deletion failed.' });
		}
	},
};

export default CommentController;
