import { hash } from "bcrypt";
import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";
import { sendVerifyMail } from "../SendVerifyEmail/SendVerifyEmail";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const passwordHash = await hash(password, 8);

      const userAlreadyExists = await prismaClient.users.findFirst({
        where: {
          email,
        },
      });

      if (userAlreadyExists) {
        return response.status(500).json({ error: "user already exists!" });
      }

      await prismaClient.users.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });

      sendVerifyMail(email);

      return response.status(201).json({ message: "User created. check your email to activate your account." });
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { CreateUserController };
