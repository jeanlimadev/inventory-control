import { CreateUser, FindUserByEmail } from "@/infra/db/repositories/interfaces";
import { UserModel } from "@/domain/models";

export class InMemoryUsersRepository implements CreateUser, FindUserByEmail {
  constructor(private readonly users: UserModel[] = []) {}

  async create (user: UserModel): Promise<void> {}

  async findByEmail(email: string): Promise<UserModel | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }
}