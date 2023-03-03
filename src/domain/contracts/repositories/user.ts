import { UserModel } from '@/domain/models';

export interface CreateUser {
  create: (user: UserModel) => Promise<void>;
}

export interface FindUserByEmail {
  findByEmail: (email: string) => Promise<UserModel | undefined>;
}