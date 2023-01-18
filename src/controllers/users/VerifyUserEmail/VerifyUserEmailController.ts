import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";

class VerifyUserEmailController {
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

      await prismaClient.users_tokens.delete({
        where: {
          id: userToken.id,
        },
      });

      return response.json({ message: "User successfully verified!" });
    } catch (error) {
      return response.status(400).json({ error: error });
    }
  }
}

export { VerifyUserEmailController };
