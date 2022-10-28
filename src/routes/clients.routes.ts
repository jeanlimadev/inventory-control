import { Router } from "express";
import { CreateClientController } from "../controllers/clients/CreateClient/CreateClientController";
import { DeleteClientController } from "../controllers/clients/DeleteClient/DeleteClientController";
import { ListClientsController } from "../controllers/clients/ListClients/ListClientsController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const listClientsController = new ListClientsController();
const deleteClientController = new DeleteClientController();

clientsRoutes.post("/create", createClientController.handle);

clientsRoutes.get("/", listClientsController.handle);

clientsRoutes.delete("/delete", deleteClientController.handle);

export { clientsRoutes };
