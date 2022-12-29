import { Router } from "express";

import { AuthenticateUserController } from "../controllers/users/AuthenticateUser/AuthenticateUserController";
import { CreateUserController } from "../controllers/users/CreateUser/CreateUserController";
import { VerifyUserEmail } from "../controllers/users/VerifyUserEmail/VerifyUserEmail";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const verifyUserEmail = new VerifyUserEmail();

usersRoutes.post("/", createUserController.handle);

usersRoutes.post("/auth", authenticateUserController.handle);

usersRoutes.get("/verify", verifyUserEmail.handle);

export { usersRoutes };
