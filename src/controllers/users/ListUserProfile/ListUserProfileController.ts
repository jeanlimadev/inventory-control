import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";


class ListUserProfileController {
  async handle(request: Request, response:Response): Promise<Response> {
    const { id } = request.user;

    const user = await prismaClient.users.findMany({
      where: {
        id,
      },
    });

    if (!user) {
      return response.status(404).json({ error: 'user not found!' });
    };

    return response.json(user);
  };
};

export { ListUserProfileController };