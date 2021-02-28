import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/surveyRepository';

class SurveyController {
  async createSurvey(req: Request, res: Response) {
    const { title, description } = req.body;
    const surveyRepo = getCustomRepository(SurveyRepository);

    const survey = surveyRepo.create({ title, description });
    await surveyRepo.save(survey);
    return res.status(201).json(survey);
  }
  async showAllSurveys(req: Request, res: Response) {
    const surveyRepo = getCustomRepository(SurveyRepository);
    const allSurveys = await surveyRepo.find();

    return res.status(200).json(allSurveys);
  }
}

export { SurveyController };
