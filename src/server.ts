import 'dotenv/config';
import env from './lib/env';
import express from 'express';

const PORT = env.PORT;

const app = express();

app.get('/', (req, res) => {
	res.json({ message: 'ok' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
