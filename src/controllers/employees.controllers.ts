import Employees from '../models/employees.models';
import { Request, Response } from 'express';
import { IEmployees } from '../interfaces/Employees.interfaces';

export const EmployeesCtrl = {
	findAllEmployees: async (req: Request, res: Response) => {
		try {
			const allEmployees = await Employees.find();
			return res.status(200).json(allEmployees);
		} catch (error: any) {
			return res.status(400).send(error.message);
		}
	},
	findSpecificEmployeeById: async (req: Request, res: Response) => {
		try {
			const employee = await Employees.findOne({ _id: req.params });
			return res.status(200).json(employee);
		} catch (error: any) {
			return res.status(400).send(error.message);
		}
	},
	findEmployeesByCompany: async (req: any, res: Response) => {
		try {
			const companysEmployees = await Employees.find({
				company: req.companyId,
			});
			return res.status(200).json(companysEmployees);
		} catch (error: any) {
			return res.status(400).send(error.message);
		}
	},
	createEmployee: async (req: Request, res: Response) => {
		const emp: IEmployees = req.body;
		const newEmployee = new Employees(emp);

		try {
			const resFromDB = await newEmployee.save();
			return res
				.status(200)
				.json(`Employee created successfully ${resFromDB}`);
		} catch (error: any) {
			return res.status(400).send(error.message);
		}
	},
	editEmployee: async (req: Request, res: Response) => {
		try {
			const editedEmployee = await Employees.updateOne(
				req.params,
				{ $set: req.body },
				{ $new: true }
			);
			return res.status(201).json(editedEmployee);
		} catch (error: any) {
			return res.status(400).json(error.message);
		}
	},
	deleteEmployee: async (req: Request, res: Response) => {
		try {
			const resFromDB = await Employees.deleteOne({ _id: req.params });
			return res
				.status(200)
				.json(`Employee was successfully deleted ${resFromDB}`);
		} catch (error: any) {
			return res.status(400).json(error.message);
		}
	},
};
