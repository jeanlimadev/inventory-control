import { Router } from "express";

import { clientsRoutes } from "./clients.routes";
import { productsRoutes } from "./products.routes";
import { providersRoutes } from "./providers.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/products", productsRoutes);
router.use("/clients", clientsRoutes);
router.use("/providers", providersRoutes);
router.use("/users", usersRoutes);

export { router };
