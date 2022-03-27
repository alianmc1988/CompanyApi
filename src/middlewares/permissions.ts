import { NextFunction, Request, Response } from 'express';
import User from '../models/users.models';
import IUser from '../interfaces/User.interface';

// Middleware if it is SuperAdmin Role will let it pass
export const SuperAdminPermision = async (
	req: Request | any,
	res: Response,
	next: NextFunction
) => {
	try {
		const finded: IUser | any = await User.findOne({ _id: req.tokenData.id });
		if (finded.role === 0) {
			next();
		} else {
			return res
				.status(403)
				.json({ message: 'You are not allowed to perform this action' });
		}
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};
