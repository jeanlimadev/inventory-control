import { Router } from "express";

import { AuthenticateUserController } from "../controllers/users/AuthenticateUser/AuthenticateUserController";
import { CreateUserController } from "../controllers/users/CreateUser/CreateUserController";
import { ListUserProfileController } from "../controllers/users/ListUserProfile/ListUserProfileController";
import { SendVerificationEmailController } from "../controllers/users/SendVerificationEmail/SendVerificationEmailController";
import { VerifyUserEmailController } from "../controllers/users/VerifyUserEmail/VerifyUserEmailController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const sendVerificationEmailController = new SendVerificationEmailController();
const verifyUserEmailController = new VerifyUserEmailController();
const listUserProfileController = new ListUserProfileController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.post("/auth", authenticateUserController.handle);

usersRoutes.post("/send-verify-mail", sendVerificationEmailController.handle);

usersRoutes.get("/verify", verifyUserEmailController.handle);

usersRoutes.get("/profile", ensureAuthenticated, listUserProfileController.handle);

export { usersRoutes };
