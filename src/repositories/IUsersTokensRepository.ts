import { users_tokens } from "@prisma/client";
import { CreateUserTokenDTO } from "@/dtos";

interface IUsersTokensRepository {
  create({
    expires_date,
    user_token,
    user_id,
  }: CreateUserTokenDTO): Promise<users_tokens>;
  findByToken(user_token: string): Promise<users_tokens>;
  deleteByUserId(user_id: string): Promise<void>;
}

export { IUsersTokensRepository };
