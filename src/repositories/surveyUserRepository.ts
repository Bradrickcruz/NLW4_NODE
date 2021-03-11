import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/surveyUserModel";

@EntityRepository(SurveyUser)
class SurveyUserRepository extends Repository<SurveyUser> {}

export { SurveyUserRepository };
