import express from 'express';
import UserController from '../controllers/UserController';
import passport from 'passport';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', passport.authenticate('local'), UserController.login);
router.post('/logout', UserController.logout);
router.get('/check-session', UserController.checkSession);

export default router;
