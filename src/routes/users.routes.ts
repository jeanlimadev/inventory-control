import { Router } from "express";

import { AuthenticateUserController } from "../controllers/users/AuthenticateUser/AuthenticateUserController";
import { CreateUserController } from "../controllers/users/CreateUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post("/create", createUserController.handle);

usersRoutes.post("/sessions", authenticateUserController.handle);

export { usersRoutes };
