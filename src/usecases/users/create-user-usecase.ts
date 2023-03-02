import { HashProvider } from '@/domain/contracts/gateways';
import { CreateUser, FindUserByEmail } from '@/domain/contracts/repositories';
import { UserModel } from '@/domain/models';

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: CreateUser & FindUserByEmail,
    private readonly hashProvider: HashProvider
  ) {}

  async execute(user: UserModel): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(user.email);
    if (userExists) throw new Error('User already exists');

    const passwordHash = await this.hashProvider.hash(user.password);

    user.password = passwordHash;

    await this.usersRepository.create(user);
  }
}
