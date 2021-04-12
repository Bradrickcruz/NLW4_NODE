import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyUserRepository } from '../repositories/surveyUserRepository';
import { AppError } from '../errors/appError';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { id } = request.query;

    const surveyUserRepo = getCustomRepository(SurveyUserRepository);
    const surveyUser = await surveyUserRepo.findOne({ id: String(id) });

    if (!surveyUser) {
      throw new AppError('Survey User not found.');
    }
    surveyUser.value = Number(value);
    await surveyUserRepo.save(surveyUser);
    return response.json(surveyUser);
  }
}

export { AnswerController };
