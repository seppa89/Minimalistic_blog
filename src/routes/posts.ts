import express from 'express';
import PostController from '../controllers/PostController';
import passport from 'passport';

const router = express.Router();

router.get('/', PostController.getAllPosts);
router.get('/:postId', PostController.getPostById);
router.post('/', PostController.createPost);
router.put('/:postId', PostController.updatePost);
router.delete('/:postId', PostController.deletePost);

export default router;
