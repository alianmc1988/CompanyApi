import { Schema, model } from 'mongoose';

const companySchema = new Schema(
	{
		name: { type: String, required: true },
		CNPJ: { type: String, maxLength: 11, unique: true, required: true },
		telephone: { type: String, required: true, maxLength: 12 },
		email: { type: String, required: true, unique: true },
		address: { type: String },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('Company', companySchema);
