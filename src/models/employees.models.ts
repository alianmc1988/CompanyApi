import { Schema, model } from 'mongoose';
import Company from './company.models';
const employeesSchema = new Schema(
	{
		name: { type: String },
		lastName: { type: String },
		CPF: { type: String, maxLength: 11, unique: true },
		address: { type: String },
		email: { type: String, unique: true },
		telephone: { type: String, maxLength: 12 },
		workAt: {
			ref: Company,
			type: Schema.Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('Employees', employeesSchema);
