import { Router } from "express";

import { clientsRoutes } from "./clients.routes";
import { productsRoutes } from "./products.routes";
import { providersRoutes } from "./providers.routes";

const router = Router();

router.use("/products", productsRoutes);
router.use("/clients", clientsRoutes);
router.use("/providers", providersRoutes);

export { router };
