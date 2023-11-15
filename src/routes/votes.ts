import express from 'express';
import VoteController from '../controllers/VoteControlles';

const router = express.Router({ mergeParams: true });

router.post('/:postId/upvote', VoteController.upvotePost);
router.post('/:postId/downvote', VoteController.downvotePost);
router.post('/:commentId/upvote', VoteController.upvoteComment);
router.post('/:commentId/downvote', VoteController.downvoteComment);

export default router;
