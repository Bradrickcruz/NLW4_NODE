import { Router } from 'express';
import { UserController } from './controllers/userController';
import { SurveyController } from './controllers/surveyController';
import { SendMailController } from './controllers/sendMailController';

const router = Router();
const UserCtrl = new UserController();
const SurveyCtrl = new SurveyController();
const SendMailCtrl = new SendMailController();

router.post('/users', UserCtrl.createUser);
router.post('/surveys', SurveyCtrl.createSurvey);
router.get('/surveys', SurveyCtrl.showAllSurveys);
router.post('/sendMail', SendMailCtrl.execute);

export { router };
