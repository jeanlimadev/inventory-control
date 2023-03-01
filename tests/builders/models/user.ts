import { randomUUID } from 'node:crypto';

import { UserModel } from "@/models";

import { faker } from '@faker-js/faker';

export class UserBuilder {
  public build(): UserModel {
    return new UserModel({
      id: randomUUID(),
      name: faker.name.firstName(),
      password: faker.random.alphaNumeric().toString(),
      createdAt: faker.datatype.datetime()
    })
  }
}
