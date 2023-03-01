import { CreateUser, FindUserByEmail } from "@/infra/repositories/interfaces";
import { UserModel } from "@/models";

export class CreateUserUseCase {
  constructor(private readonly usersRepository: CreateUser & FindUserByEmail) {}

  async execute (user: UserModel): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(user.email);
    if (userExists) throw new Error('User already exists');
    
    await this.usersRepository.create(user);
  }
}