import { Router } from "express";
import { UserController } from "./controllers/userController";
import { SurveyController } from "./controllers/surveyController";

const router = Router();
const UserCtrl = new UserController();
const SurveyCtrl = new SurveyController();

router.post("/users", UserCtrl.createUser);
router.post("/surveys", SurveyCtrl.createSurvey);
router.get("/surveys", SurveyCtrl.showAllSurveys);

export { router };
