import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/surveyModel";

@EntityRepository(Survey)
class SurveyRepository extends Repository<Survey> {}

export { SurveyRepository };
