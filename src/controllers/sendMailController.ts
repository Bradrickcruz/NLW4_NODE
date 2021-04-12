import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/userRepository';
import { SurveyRepository } from '../repositories/surveyRepository';
import { SurveyUserRepository } from '../repositories/surveyUserRepository';
import SendMailService from '../services/sendMailService';
import { AppError } from '../errors/appError';
import { resolve } from 'path';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new AppError('User does not exists!');
    }
    const survey = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      throw new AppError('Surveys does not exists!');
    }

    let surveyUser = await surveyUserRepository.findOne({
      where: { user_id: user.id, value: null, survey_id: survey.id },
      relations: ['user', 'survey'],
    });

    if (!surveyUser) {
      surveyUser = await surveyUserRepository.create({
        user_id: user.id,
        survey_id,
      });
      await surveyUserRepository.save(surveyUser);
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
    const vars = {
      name: user.name,
      id: surveyUser.id,
      title: survey.title,
      description: survey.description,
      link: process.env.URL_MAIL,
    };
    await SendMailService.execute(email, vars, npsPath);

    return response.json(surveyUser);
  }
}

export { SendMailController };
