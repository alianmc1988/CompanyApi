import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/User.interface';
import Jwt from 'jsonwebtoken';

const SECRET_KEY: string = process.env.SECRET || 'TestSecret';
export const verifyToken = (
	req: Request | any,
	res: Response,
	next: NextFunction
) => {
	const token: string = req.header('auth-token');
	if (!token) return res.status(400).json({ message: 'Access forbidden' });
	const payload = Jwt.verify(token, SECRET_KEY);
	if (!payload)
		return res
			.status(400)
			.json({ message: 'You do not have access to this resource.' });
	console.log(payload);
	req.tokenData = payload;
	next();
};

export const createToken = (userFounded: IUser): string => {
	return Jwt.sign({ id: userFounded.id }, SECRET_KEY, {
		expiresIn: 86400,
	});
};
