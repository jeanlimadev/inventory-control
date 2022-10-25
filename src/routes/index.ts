import { Router } from "express";
import { prismaClient } from "../database/prismaClient";
import { productsRoutes } from "./products.routes";

const router = Router();

router.use("/products", productsRoutes);

export { router };
