import { randomUUID }  from "node:crypto"

import { ProductModel } from "@/domain/models";

import { faker } from "@faker-js/faker";


export class ProductBuilder {
  public build(): ProductModel {
    return new ProductModel({
      id: randomUUID(),
      name: faker.name.firstName(),
      createdAt: faker.datatype.datetime()
    })
  }
}