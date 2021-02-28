import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/userRepository";

class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const userRepo = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepo.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        error: "user already exists",
      });
    }

    const user = userRepo.create({ name, email });
    await userRepo.save(user);
    return res.status(201).json(user);
  }
}

export { UserController };
