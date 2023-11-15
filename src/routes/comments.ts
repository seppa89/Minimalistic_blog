import express from 'express';
import CommentController from '../controllers/CommentController';
import { ensureAuthenticated } from '../middleware/protectRoute';

const router = express.Router({ mergeParams: true });

router.get('/:postId', CommentController.getAllCommentsForPost);
router.post('/:postId', ensureAuthenticated, CommentController.createComment);
router.put('/:commentId', ensureAuthenticated, CommentController.updateComment);
router.delete(
	'/:commentId',
	ensureAuthenticated,
	CommentController.deleteComment
);

export default router;
