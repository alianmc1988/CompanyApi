import { Router } from 'express';
import { EmployeesCtrl } from '../controllers/employees.controllers';
import { verifyToken } from '../middlewares/verifyToken';
const router = Router();

router.get('/', verifyToken, EmployeesCtrl.findAllEmployees);

router.get('/:id', verifyToken, EmployeesCtrl.findSpecificEmployeeById);

router.get('/:companyId', verifyToken, EmployeesCtrl.findEmployeesByCompany);

router.post('/', verifyToken, EmployeesCtrl.createEmployee);

router.put('/:id', verifyToken, EmployeesCtrl.editEmployee);

router.delete('/:id', verifyToken, EmployeesCtrl.deleteEmployee);

export default router;
