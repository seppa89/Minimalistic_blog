import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import passport from 'passport';

const UserController = {
	register: async (
		req: Request<{}, {}, { username: string; password: string }>,
		res: Response<{ message: string; success: boolean }>
	) => {
		if (!req.body.username || !req.body.password) {
			return res.status(400).json({
				message: 'Username and password are required',
				success: false,
			});
		}

		try {
			User.register(
				new User({ username: req.body.username }),
				req.body.password,
				(err, user) => {
					if (err) {
						return res.json({
							success: false,
							message: 'Your account could not be saved. Error: ' + err,
						});
					}
					const authenticate = User.authenticate();

					authenticate(req.body.username, req.body.password, (err, user) => {
						if (err) {
							return res
								.status(401)
								.json({ message: 'Not Auth', success: false });
						} else {
							return res.status(200).json({ message: 'Auth', success: true });
						}
					});
				}
			);
		} catch (err) {
			return res.json({
				success: false,
				message: 'Your account could not be saved. Error: ' + err,
			});
		}
	},
	login: (
		req: Request<any, any, { password: string; username: string }>,
		res: Response
	) => {
		res.status(200).json({ messagge: 'Auth', user: req.user?._id });
	},
	logout: (req: Request, res: Response, next: NextFunction) => {
		req.logout(err => {
			if (err) {
				return next(err);
			}
			res.json({ message: 'Success logout', success: true });
		});
	},
	checkSession: (req: Request, res: Response) => {
		if (req.isAuthenticated()) {
			res.json({
				message: 'You made it to the secured profie',
				user: req.user.username,
			});
		} else {
			res
				.status(401)
				.json({ message: 'You are not authenticated', success: false });
		}
	},
};

export default UserController;
