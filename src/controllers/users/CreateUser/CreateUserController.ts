import { hash } from "bcrypt";
import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      return response.status(500).json({ error: "user already exists!" });
    }

    await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
