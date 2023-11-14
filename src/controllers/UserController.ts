import { Request, Response } from 'express';
import User from '../models/User';

const UserController = {
	register: async (
		req: Request<{}, {}, { username: string; password: string }>,
		res: Response<{ message: string; success: boolean }>
	) => {
		console.log(req.body);
		const username = req.body?.username;
		const password = req.body?.password;

		if (!username || !password) {
			return res.status(401).json({
				message: 'Username and password are required',
				success: false,
			});
		}

		try {
			const user = new User({ username, password });
			return user
				.save()
				.then(() => {
					res.json({ success: true, message: 'User registered successfully.' });
				})
				.catch(error => {
					if (error.code === 11000) {
						return res
							.status(409)
							.json({ success: false, message: 'Username is Taken' });
					}
				});
		} catch (error) {
			res.status(500).json({ success: false, message: 'Registration failed.' });
		}
	},
};

export default UserController;
