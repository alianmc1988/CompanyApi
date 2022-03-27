import { Router, Response, Request } from 'express';
import { CompanyCtrl } from '../controllers/company.controllers';

const router = Router();

router.get('/', CompanyCtrl.getAllCompanies);
router.post('/', CompanyCtrl.createCompany);
router.get('/:id', CompanyCtrl.getCompanyById);
router.get('/:cnpj', CompanyCtrl.getCompanyByCNPJ);
router.put('/:id', CompanyCtrl.editCompany);
router.delete('/:id', CompanyCtrl.deleteCompany);
export default router;
