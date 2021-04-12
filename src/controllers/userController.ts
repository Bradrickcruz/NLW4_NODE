import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../errors/appError';
import * as yup from 'yup';

class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    try {
      await schema.validate({ name, email },{abortEarly:false});  
    } catch (error) {
      throw new AppError(error.message,400,error.errors);
    }

    const userRepo = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepo.findOne({ email });
    if (userAlreadyExists) {
      throw new AppError('user already exists');
    }

    const user = userRepo.create({ name, email });
    await userRepo.save(user);
    return res.status(201).json(user);
  }
}

export { UserController };
