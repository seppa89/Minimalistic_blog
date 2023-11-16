import 'dotenv/config';
import env from './lib/env';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import userRouter from './routes/users';
import postRouter from './routes/posts';
import commentRouter from './routes/comments';
import votesRouter from './routes/votes';
import passport from 'passport';
import User from './models/User';

const PORT = env.PORT;

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', env.CLIENT_DOMAIN);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', 'true');

	next();
});

app.use(
	session({
		secret: env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60,
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(User.createStrategy());

//@ts-ignore
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/votes', votesRouter);

app.use(async (req, res) => {
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	res.status(404).json({ message: 'Not found' });
});

mongoose
	.connect(env.MONGODB_URI)
	.then(() => {
		console.log('Connect to database');
		app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
	})
	.catch(err => {
		console.log('Failed connecting to database');
	});
