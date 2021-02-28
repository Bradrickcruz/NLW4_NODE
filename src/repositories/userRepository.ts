import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/userModel";

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export { UserRepository };
