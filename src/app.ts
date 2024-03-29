import "reflect-metadata";
import express from "express";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express";
import cors from "cors"

import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(cors())

app.use(router);

export { app };
