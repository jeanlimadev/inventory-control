import { Router } from "express";
import { request } from "http";

import { CreateClientController } from "../controllers/clients/CreateClient/CreateClientController";
import { DeleteClientController } from "../controllers/clients/DeleteClient/DeleteClientController";
import { EditClientController } from "../controllers/clients/EditClient/EditClientController";
import { ListClientsController } from "../controllers/clients/ListClients/ListClientsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const listClientsController = new ListClientsController();
const editClientController = new EditClientController();
const deleteClientController = new DeleteClientController();

clientsRoutes.post(
  "/create",
  ensureAuthenticated,
  createClientController.handle
);

clientsRoutes.get("/", ensureAuthenticated, listClientsController.handle);

clientsRoutes.patch(
  "/edit/:id",
  ensureAuthenticated,
  editClientController.handle
);

clientsRoutes.delete(
  "/delete/:id",
  ensureAuthenticated,
  deleteClientController.handle
);

export { clientsRoutes };
