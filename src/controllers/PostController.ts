import { Request, Response } from 'express';
import Post from '../models/Post';

const PostController = {
	getAllPosts: async (req: Request, res: Response) => {
		try {
			const posts = await Post.find();
			res.json(posts);
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Internal Server Error', success: false });
		}
	},
	getPostById: async (req: Request<{ postId: string }>, res: Response) => {
		try {
			const post = await Post.findById(req.params.postId);
			res.json(post);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	createPost: async (
		req: Request<any, any, { title: string; content: string }>,
		res: Response
	) => {
		const { content, title } = req.body;
		console.log('create post');
		if (!title || !content) {
			return res
				.status(400)
				.json({ message: 'Content and title are required', success: false });
		} else if (!req.user) {
			return res.status(401).json({ message: 'Unauthoriezed', success: false });
		}

		try {
			const newPost = new Post({ title, content, author: req?.user?._id });
			await newPost.save();

			res
				.status(201)
				.json({ success: true, message: 'Post created successfully.' });
		} catch (error) {
			res
				.status(500)
				.json({ success: false, message: 'Post creation failed.' });
		}
	},
	updatePost: async (
		req: Request<{ postId: string }, any, { title: string; content: string }>,
		res: Response
	) => {
		const { title, content } = req.body;
		if (!title || !content) {
			return res
				.status(400)
				.json({ message: 'Content and title are required', success: false });
		}

		try {
			await Post.findByIdAndUpdate(req.params.postId, { title, content });
			res.json({ success: true, message: 'Post updated successfully.' });
		} catch (error) {
			res.status(500).json({ success: false, message: 'Post update failed.' });
		}
	},
	deletePost: async (req: Request<{ postId: string }>, res: Response) => {
		try {
			await Post.findByIdAndRemove(req.params.postId);
			res.json({ success: true, message: 'Post deleted successfully.' });
		} catch (error) {
			res
				.status(500)
				.json({ success: false, message: 'Post deletion failed.' });
		}
	},
};

export default PostController;
