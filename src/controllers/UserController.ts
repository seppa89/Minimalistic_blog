import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import passport from 'passport';

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
			// @ts-ignore
			return User.register({ username, password }, password, (err, user) => {
				if (err) {
					if (err.name === 'UserExistsError') {
						return res.status(401).json({
							message: 'A user with the given username is already registered',
							success: false,
						});
					} else {
						return res
							.status(401)
							.json({ message: 'Unauthorized', success: false });
					}
				} else {
					passport.authenticate('local')(req, res, () => {
						return res.json({ message: 'Authorized', success: true });
					});
				}
			});
		} catch (error) {
			res.status(500).json({ success: false, message: 'Registration failed.' });
		}
	},
	login: (req: Request, res: Response) => {
		res.json({ message: 'Authenticated', success: true });
	},
	logout: (req: Request, res: Response, next: NextFunction) => {
		req.logout(err => {
			if (err) {
				return next(err);
			}
			res.json({ message: 'Success logout', success: true });
		});
	},
};

export default UserController;
