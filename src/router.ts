import { Router } from 'express';
import { UserController } from './controllers/userController';
import { SurveyController } from './controllers/surveyController';
import { SendMailController } from './controllers/sendMailController';
import { AnswerController } from './controllers/answerController';
import { NpsController } from './controllers/npsController';

const router = Router();
const UserCtrl = new UserController();
const SurveyCtrl = new SurveyController();
const SendMailCtrl = new SendMailController();
const AnswerCtrl = new AnswerController();
const NpsCtrl = new NpsController();

router.post('/users', UserCtrl.createUser);
router.post('/surveys', SurveyCtrl.createSurvey);
router.get('/surveys', SurveyCtrl.showAllSurveys);
router.post('/sendMail', SendMailCtrl.execute);
router.get('/answer/:value', AnswerCtrl.execute);
router.get('/nps/:survey_id', NpsCtrl.execute);

export { router };
