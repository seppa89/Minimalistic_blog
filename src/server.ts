import 'dotenv/config';
import env from './lib/env';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import userRouter from './routes/users';
import postRouter from './routes/posts';
import commentRouter from './routes/comments';
import passport from 'passport';
import User from './models/User';

const PORT = env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

// @ts-ignore
passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

mongoose
	.connect(env.MONGODB_URI)
	.then(() => {
		console.log('Connect to database');
		app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
	})
	.catch(err => {
		console.log('Failed connecting to database');
	});
