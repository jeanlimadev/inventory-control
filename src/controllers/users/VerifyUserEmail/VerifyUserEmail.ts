import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";

class VerifyUserEmail {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.query;

      const userToken = await prismaClient.users_tokens.findFirst({
        where: {
          user_token: String(token),
        },
      });

      if (!userToken) {
        return response.status(400).json({ message: "Invalid token!" });
      }

      await prismaClient.users.update({
        where: {
          id: userToken?.user_id,
        },
        data: {
          verified: true,
        },
      });

      return response.json({ message: "User successfully verified!" });
    } catch (error) {
      return response.status(400).json({ error: error });
    }
  }
}

export { VerifyUserEmail };
