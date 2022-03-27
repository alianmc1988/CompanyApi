import { Router } from 'express';
import userCtrl from '../controllers/users.controllers';

const router = Router();

router.get('/', userCtrl.getAllUsers);
router.post('/', userCtrl.createUser);
router.delete('/:id', userCtrl.deleteUser);

export default router;
