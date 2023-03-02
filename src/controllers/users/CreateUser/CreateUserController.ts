import { prismaClient } from '@/database/prismaClient';

import { hash } from 'bcrypt';
import { Request, Response } from 'express';

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
        return response.status(500).json({ error: 'user already exists!' });
      }

      await prismaClient.users.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });

      return response.status(201).json({
        message:
          'User successfully created. Confirm your email to be able to use the application.',
      });
    } catch (error) {
      return response.status(400).json({ error: 'Verify your request data.' });
    }
  }
}

export { CreateUserController };
