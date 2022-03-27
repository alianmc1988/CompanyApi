import { Request, Response } from 'express';
import Company from '../models/company.models';
import { ICompany } from '../interfaces/Company.interface';

export const CompanyCtrl = {
	createCompany: async (req: Request, res: Response) => {
		const newCompany = new Company(req.body as ICompany);
		try {
			const saved = await newCompany.save();
			return res.status(200).json(`Company saved successfully ${saved}`);
		} catch (error: any) {
			return res.status(400).json(error.message);
		}
	},
	getAllCompanies: async (req: Request, res: Response) => {
		try {
			const allCompanies = await Company.find();
			return res.status(200).json(allCompanies);
		} catch (error: any) {
			return res.status(400).json(error.message);
		}
	},
	getCompanyById: async (req: Request, res: Response) => {
		try {
			const companyFinded = await Company.findOne({ _id: req.params });
			return res.status(200).json(companyFinded);
		} catch (error: any) {
			return res.status(400).json(error.message);
		}
	},
	getCompanyByCNPJ: async (req: Request, res: Response) => {
		try {
			const companyFinded = await Company.findOne({ CNPJ: req.params });
			return res.status(200).json(companyFinded);
		} catch (error: any) {
			return res.status(400).json(error.message);
		}
	},
	editCompany: async (req: Request, res: Response) => {
		try {
			const responseFromDb = await Company.updateOne(
				req.params,
				{
					$set: req.body,
				},
				{ $new: true }
			);
			return res.status(200).json(responseFromDb);
		} catch (error: any) {
			return res.status(400).json(error.message);
		}
	},
	deleteCompany: async (req: Request, res: Response) => {
		try {
			const responseFromDb = await Company.deleteOne({ _id: req.params });
			return res
				.status(200)
				.json(`Company has been deleted ${responseFromDb}`);
		} catch (error: any) {
			return res.status(400).json(error.message);
		}
	},
};
