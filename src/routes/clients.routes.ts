import { Router } from "express";
import { CreateClientController } from "../controllers/clients/CreateClientController";
import { ListClientsController } from "../controllers/clients/ListClientsController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const listClientsController = new ListClientsController();

clientsRoutes.post("/create", createClientController.handle);

clientsRoutes.get("/", listClientsController.handle);

export { clientsRoutes };
