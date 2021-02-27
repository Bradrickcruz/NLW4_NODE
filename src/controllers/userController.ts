import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/userModel';

class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const userRepository = getRepository(User);

    const userAlreadyExists = await userRepository.findOne({ email });
    if(userAlreadyExists){
      res.status(400).json({
        error:'user already exists'
      })
    }

    const user = userRepository.create({ name, email });
    await userRepository.save(user);
    res.json(user);
  }
}

export { UserController };
