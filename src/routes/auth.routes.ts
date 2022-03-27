import { Router } from 'express';
import auth from '../controllers/authentication.controllers';

const router = Router();

router.post('/', auth.login);

export default router;
