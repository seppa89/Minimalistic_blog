import { NextFunction, Request, Response } from 'express';

export const ensureAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({ message: 'Unauthorized', success: false });
	}
};
