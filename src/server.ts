import 'dotenv/config';
import env from './lib/env';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';

const PORT = env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

mongoose.connect(env.MONGODB_URI).then(() => {
	console.log('Connect to database');
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
