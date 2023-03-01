import { UserBuilder } from "#/builders/models/user";
import { InMemoryUsersRepository } from "#/infra/repositories";
import { UserModel } from "@/models";
import { CreateUserUseCase } from "@/usecases/users"

interface Subject {
  usersRepository: InMemoryUsersRepository;
  sut: CreateUserUseCase;
}

const createSubject = (users: UserModel[] = []): Subject => {
  const usersRepository = new InMemoryUsersRepository(users);
  const sut = new CreateUserUseCase(usersRepository);

  usersRepository.create = jest.fn();

  return {
    usersRepository,
    sut
  }
}

describe('CreateUserUseCase', () => {
  it('should be abe to create a user', async () => {
    const { sut, usersRepository } = createSubject();
    const user = new UserBuilder().build();

    await sut.execute(user);

    expect(usersRepository.create).toHaveBeenNthCalledWith(1, user);
  })

  it('should not be abe to create a user', async () => {
    const user = new UserBuilder().build();
    const { sut, usersRepository } = createSubject([user]);

    await expect(sut.execute(user)).rejects.toThrow();

    expect(usersRepository.create).not.toHaveBeenCalled();
  })
})