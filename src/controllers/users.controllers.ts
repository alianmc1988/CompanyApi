import { Request, Response } from 'express';
import User from '../models/users.models';
import IUser from '../interfaces/User.interface';
import Roles from '../enums/roles.enums';
const userCtrl = {
	getAllUsers: async (req: Request, res: Response) => {
		try {
			const users = await User.find();
			return res.status(200).json(users);
		} catch (error) {
			return res.status(404).json(error);
		}
	},

	createUser: async (req: Request, res: Response) => {
		const newUser: IUser = new User(req.body);
		console.log(typeof newUser.role);
		try {
			newUser.password = await newUser.encryptPassword(req.body.password);
			if (!newUser.role || typeof newUser.role === 'string') {
				newUser.addRole(newUser.role || '');
			}
			const savedUser: IUser = await newUser.save();
			return res.status(201).json(savedUser);
		} catch (error: any) {
			if (error.code === 11000) {
				return res
					.status(400)
					.json({ message: 'Ya existe un usuario con ese email' });
			}
			return res.status(501).json(error.message);
		}
	},

	deleteUser: async (req: Request, res: Response) => {
		try {
			const deleted = await User.findByIdAndRemove({ _id: req.params.id });
			console.log(deleted);
			if (deleted) {
				return res.status(200).json({ message: `user deleted ` });
			}
		} catch (error) {
			return res.status(501).json(error);
		}
	},
};

export default userCtrl;
