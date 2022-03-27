import Roles from '../enums/roles.enums';
import { Document } from 'mongoose';

interface IUser extends Document {
	_id?: string;
	userName: string;
	email: string;
	password: string;
	role?: Roles | string;
	encryptPassword(password: string): Promise<string>;
	comparePassword(password: string): Promise<boolean>;
	addRole(role: string): any;
}

export default IUser;
