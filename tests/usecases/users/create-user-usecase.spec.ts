import { UserModel } from '@/domain/models';
import { CreateUserUseCase } from '@/usecases/users';

import { UserBuilder } from '#/builders/models/user';
import { HasherProviderStub } from '#/infra/hash';
import { InMemoryUsersRepository } from '#/infra/repositories';

interface Subject {
  usersRepository: InMemoryUsersRepository;
  hasherProviderStub: HasherProviderStub;
  sut: CreateUserUseCase;
}

const createSubject = (users: UserModel[] = []): Subject => {
  const usersRepository = new InMemoryUsersRepository(users);
  const hasherProviderStub = new HasherProviderStub();
  const sut = new CreateUserUseCase(usersRepository, hasherProviderStub);

  usersRepository.create = jest.fn();

  return {
    usersRepository,
    hasherProviderStub,
    sut,
  };
};

describe('CreateUserUseCase', () => {
  it('should be abe to create a user', async () => {
    const { sut, usersRepository, hasherProviderStub } = createSubject();
    const user = new UserBuilder().build();
    const hasherStub = jest.spyOn(hasherProviderStub, 'hash');
    user.password = 'hashed-password';

    await sut.execute(user);

    expect(usersRepository.create).toHaveBeenNthCalledWith(1, user);
    expect(hasherStub).toHaveBeenCalledWith(user.password);
  });

  it('should not be abe to create a user', async () => {
    const user = new UserBuilder().build();
    const { sut, usersRepository } = createSubject([user]);

    await expect(sut.execute(user)).rejects.toThrow();

    expect(usersRepository.create).not.toHaveBeenCalled();
  });
});
