import { Router } from "express";

import { CreateCustomerController } from "../controllers/customers/CreateCustomer/CreateCustomerController";
import { DeleteCustomerController } from "../controllers/customers/DeleteCustomer/DeleteCustomerController";
import { EditCustomerController } from "../controllers/customers/EditCustomer/EditCustomerController";
import { ListCustomersController } from "../controllers/customers/ListCustomers/ListCustomersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();
const listCustomersController = new ListCustomersController();
const editCustomerController = new EditCustomerController();
const deleteCustomerController = new DeleteCustomerController();

customersRoutes.post("/", ensureAuthenticated, createCustomerController.handle);

customersRoutes.get("/", ensureAuthenticated, listCustomersController.handle);

customersRoutes.patch(
  "/:id",
  ensureAuthenticated,
  editCustomerController.handle
);

customersRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteCustomerController.handle
);

export { customersRoutes };
