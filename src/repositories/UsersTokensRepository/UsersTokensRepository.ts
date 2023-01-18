import { singleton } from "tsyringe";

import { users_tokens } from "@prisma/client";
import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../IUsersTokensRepository";
import { prismaClient } from "../../database/prismaClient";

@singleton()
class UsersTokensRepository implements IUsersTokensRepository {
    async create({
    expires_date,
    user_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<users_tokens> {
    const userToken = await prismaClient.users_tokens.create({
      data: {
        user_id,
        user_token,
        expires_date,
      },
    });

    return userToken;
  }

  async findByToken(user_token: string): Promise<users_tokens> {
    const userToken = await prismaClient.users_tokens.findFirstOrThrow({
      where: {
        user_token,
      },
    });

    return userToken;
  }

  async deleteByUserId(user_id: string): Promise<void> {
    const userToken = await prismaClient.users_tokens.findFirstOrThrow({
      where: {
        user_id,
      },
    });

    await prismaClient.users_tokens.deleteMany({
      where: {
        id: userToken.id,
      },
    });
  }
}

export { UsersTokensRepository };
