import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../config/auth";
import { prismaClient } from "../database/prismaClient";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "Token missing!" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token);

    request.user = { id: String(user_id) };

    const tokenExists = await prismaClient.users_tokens.findFirst({
      where: {
        user_token: token
      }
    });

    if (!tokenExists) {
      return response.status(401).json({ error: "Invalid Token!" });
    }

    next();
  } catch {
    return response.status(401).json({ error: "Invalid Token!" });
  }
}
