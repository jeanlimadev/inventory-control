import { users_tokens } from "@prisma/client";
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUsersTokensRepository {
  create({
    expires_date,
    user_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<users_tokens>;
  findByToken(user_token: string): Promise<users_tokens>;
  deleteByUserId(user_id: string): Promise<void>;
}

export { IUsersTokensRepository };
