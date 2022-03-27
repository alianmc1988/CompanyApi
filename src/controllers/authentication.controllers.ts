import { Request, Response } from 'express';
import { createToken } from '../middlewares/verifyToken';
import User from '../models/users.models';
const auth = {
	login: async (req: Request, res: Response) => {
		try {
			const userFounded = await User.findOne({ email: req.body.email });
			if (!userFounded) throw Error('No user found with that email');
			const match = await userFounded.comparePassword(req.body.password);
			if (!match) throw Error('Pass dont match');
			const token: string = createToken(userFounded);
			return res
				.status(200)
				.header({ 'auth-token': token })
				.json(userFounded);
		} catch (error: any) {
			console.log(error.message);
			return res.json('Do not match');
		}
	},
};

export default auth;
