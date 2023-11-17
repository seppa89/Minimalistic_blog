import { NextFunction, Request, Response } from 'express';
import User, { UserDocument } from '../models/User';
import passport from 'passport';
import { HydratedDocument } from 'mongoose';

const UserController = {
	register: async (
		req: Request<{}, {}, { username: string; password: string }>,
		res: Response<{ message?: string; success: boolean; error?: string }>
	) => {
		const username = req.body?.username.trim();
		const password = req.body?.password.replace(/ /g, '');

		if (!username.length || !password.length) {
			return res.status(400).json({
				error: 'Username and password are required.',
				success: false,
			});
		} else if (password.length < 6) {
			return res.status(400).json({
				error: 'Password must have at least 6 characters.',
				success: false,
			});
		}

		try {
			User.register(new User({ username }), password, (err, user) => {
				if (err) {
					return res.status(409).json({
						success: false,
						error: err.message,
					});
				}
				const authenticate = User.authenticate();

				authenticate(username, password, (err, user) => {
					if (err) {
						return res.status(401).json({
							error: 'User could not be authenticated.',
							success: false,
						});
					} else {
						return res.status(201).json({
							message: 'User successfully registered.',
							success: true,
						});
					}
				});
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				error: 'Error: ' + err,
			});
		}
	},
	login: [
		(req: Request, res: Response, next: NextFunction) =>
			passport.authenticate(
				'local',
				(
					err: unknown,
					user: HydratedDocument<UserDocument>,
					info: { name: string; message: string },
					status: number
				) => {
					if (err) {
						return res.status(status).json({
							error: 'Internal error.',
							user: null,
							success: false,
						});
					}

					let code: number;

					if (info) {
						const message = info.message;
						switch (message) {
							case 'Missing credentials': {
								code = 400;
								break;
							}
							case 'Password or username is incorrect': {
								code = 401;
								break;
							}
							default:
								code = status;
						}
						return res.status(code).json({
							error: info.message,
							success: false,
						});
					}

					if (user) {
						req.logIn(user, function (err) {
							if (err) {
								return next(err);
							}
							return res.status(200).json({
								messagge: 'User successfully authenticated.',
								user: req.user?.username,
								success: true,
							});
						});
					}
				}
			)(req, res, next),
	],
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
				message: 'User authorized',
				user: req.user.username,
			});
		} else {
			res.status(401).json({ message: 'User unauthorized', success: false });
		}
	},
};

export default UserController;
