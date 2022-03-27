import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/User.interface';
import Roles from '../enums/roles.enums';

const usersSchema = new Schema(
	{
		username: {
			type: String,
			maxlength: 12,
			minlength: 5,
			required: true,
			unique: true,
		},
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 8 },
		role: { type: Number, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

usersSchema.methods.encryptPassword = async (
	password: string
): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

usersSchema.methods.comparePassword = async function (
	receivedPassword: string
): Promise<boolean> {
	return bcrypt.compareSync(receivedPassword, this.password);
};
usersSchema.methods.addRole = function (role: string) {
	switch (role) {
		case 'SuperAdmin':
			this.role = Roles.SuperAdmin;
			return;
		case 'Admin':
			this.role = Roles.Admin;
			return;
		case 'Worker':
			this.role = Roles.Worker;
			return;

		default:
			this.role = Roles.Gest;
			return;
	}
};

export default model<IUser>('User', usersSchema);
