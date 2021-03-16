import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyUserRepository } from '../repositories/surveyUserRepository';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { id } = request.query;

    const surveyUserRepo = getCustomRepository(SurveyUserRepository);
    const surveyUser = await surveyUserRepo.findOne({ id: String(id) });

    if (!surveyUser) {
      return response.status(400).json({ error: 'Survey User not found.' });
    }
    surveyUser.value = Number(value);
    await surveyUserRepo.save(surveyUser);
    return response.json(surveyUser);
  }
}

export { AnswerController };
