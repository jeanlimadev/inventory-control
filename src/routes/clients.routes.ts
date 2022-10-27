import { Router } from "express";
import { CreateClientController } from "../controllers/clients/CreateClientController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();

clientsRoutes.post("/create", createClientController.handle);

export { clientsRoutes };
