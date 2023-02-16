import { Request, Response } from "express";


class VerifyUserTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.send()
  };
} 

export { VerifyUserTokenController };