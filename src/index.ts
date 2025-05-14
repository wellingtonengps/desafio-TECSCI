import express, { Express } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import Routers from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";
import { seedUsinas } from "./seeds/seedsUsinas";
import { seedInversores } from "./seeds/seedsInversores";

dotenv.config();

export const prisma = new PrismaClient();
const app: Express = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(Routers);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await seedUsinas();
  await seedInversores();
});
