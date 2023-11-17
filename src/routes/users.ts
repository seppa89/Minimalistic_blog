import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/check-session', UserController.checkSession);

export default router;
