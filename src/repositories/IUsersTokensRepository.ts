import { usersTokens } from "@prisma/client";
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUsersTokensRepository {
  create({
    expires_date,
    user_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<usersTokens>;

  findByToken(user_token: string): Promise<usersTokens>;
}

export { IUsersTokensRepository };
