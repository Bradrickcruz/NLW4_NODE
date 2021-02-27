import { Router } from 'express';
import { UserController } from './controllers/userController';

const router = Router();
const UserCtrl = new UserController();

router.post('/users', UserCtrl.createUser);

export { router };
