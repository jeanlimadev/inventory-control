import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";
import auth from "../../../config/auth";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return response
        .status(500)
        .json({ error: "Email or password incorrect!" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return response
        .status(500)
        .json({ error: "Email or password incorrect!" });
    }

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

    return response.json(tokenReturn);
  }
}

export { AuthenticateUserController };
