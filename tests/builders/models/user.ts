import { randomUUID } from 'node:crypto';

import { UserModel } from "@/domain/models";

import { faker } from '@faker-js/faker';

export class UserBuilder {
  public build(): UserModel {
    return new UserModel({
      id: randomUUID(),
      email: faker.internet.email(),
      name: faker.name.firstName(),
      password: 'hashed-password',
      createdAt: faker.datatype.datetime()
    })
  }
}
