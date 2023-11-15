import express from 'express';
import PostController from '../controllers/PostController';
import { ensureAuthenticated } from '../middleware/protectRoute';

const router = express.Router();

router.get('/', PostController.getAllPosts);
router.get('/:postId', PostController.getPostById);
router.post('/', ensureAuthenticated, PostController.createPost);
router.put('/:postId', ensureAuthenticated, PostController.updatePost);
router.delete('/:postId', ensureAuthenticated, PostController.deletePost);

export default router;
