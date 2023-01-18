import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";
import auth from "../../../config/auth";
import { container } from "tsyringe";
import { UsersTokensRepository } from "../../../repositories/UsersTokensRepository/UsersTokensRepository";
import { DayJsDateProvider } from "../../../utils/DateProvider/DayJsDateProvider";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const { expires_token_days } = auth;

      const user = await prismaClient.users.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return response
          .status(401)
          .json({ error: "Email or password incorrect!" });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return response
          .status(401)
          .json({ error: "Email or password incorrect!" });
      }

      if (!user.verified) {
        return response.status(500).json({ error: "User does not verified!" });
      }

      await prismaClient.users_tokens.deleteMany({
        where: {
          user_id: user.id
        }
      });

      const token = sign({}, auth.secret_token, {
        subject: user.id,
        expiresIn: auth.expires_in_token,
      });

      const tokenReturn: IResponse = {
        user: {
          name: user.name,
          email: user.email,
        },
        token,
      };

      const usersTokensRepository = container.resolve(UsersTokensRepository);

      const dayJsDateProvider = container.resolve(DayJsDateProvider);

      const token_expires_date = dayJsDateProvider.addDays(expires_token_days);

      usersTokensRepository.create({
        user_id: user.id,
        user_token: token,
        expires_date: token_expires_date,
      });

      return response.json(tokenReturn);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { AuthenticateUserController };
