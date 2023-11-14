import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', () => {});
router.post('/logout', () => {});

export default router;
