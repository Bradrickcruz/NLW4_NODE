import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveyUserRepository } from '../repositories/surveyUserRepository';

class NpsController {
  // detratores =>  0 - 6
  // passivos =>    7 - 8
  // promotores =>  9 - 10
  // cálculo de NPS = ((nº promotores - nº detratores) / (nº respondentes)) * 100
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;
    const surveyUserRepo = getCustomRepository(SurveyUserRepository);

    const surveyUsers = await surveyUserRepo.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractorsQty = surveyUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;
    const passivesQty = surveyUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;
    const promotersQty = surveyUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const totalAnswers = surveyUsers.length;
    const result = (
      ((promotersQty - detractorsQty) / totalAnswers) *
      100
    ).toFixed(2);

    response.json({
      detractors: detractorsQty,
      promoters: promotersQty,
      passives: passivesQty,
      totalAnswers,
      NPS: result,
    });
  }
}

export { NpsController };
