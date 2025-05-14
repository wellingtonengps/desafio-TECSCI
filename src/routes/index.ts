import { Router } from "express";
import usinaController from "../controllers/usinaController";
import inversorController from "../controllers/inversorController";
import leituraController from "../controllers/leituraController";
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const Routers = Router();

Routers.get("/api/usinas", usinaController.getAllUsinas);
Routers.get("/api/usinas/geracao", usinaController.getGeracaoUsina);
Routers.get("/api/usinas/:id", usinaController.getUsina);
Routers.post("/api/usinas", usinaController.createUsina);
Routers.put("/api/usinas/:id", usinaController.updateUsina);
Routers.delete("/api/usinas/:id", usinaController.deleteUsina);

Routers.get("/api/inversores", inversorController.getAllInversores);
Routers.get("/api/inversores/:id", inversorController.getInversor);
Routers.post("/api/inversores", inversorController.createInversor);
Routers.put("/api/inversores/:id", inversorController.updateInversor);
Routers.delete("/api/inversores/:id", inversorController.deleteInversor);
Routers.get(
  "/api/inversor/temperaturaMedia",
  inversorController.getTemperaturaMedia
);
Routers.get(
  "/api/inversor/potenciaMaxima",
  inversorController.getPotenciaMaxima
);
Routers.get("/api/inversor/geracao", inversorController.getGeracaoInversor);

Routers.get("/api/leitura", leituraController.getAllLeituras);
Routers.get("/api/leitura/:id", leituraController.getLeitura);
Routers.post("/api/leitura", leituraController.createLeitura);
Routers.delete("/api/leitura/:id", leituraController.deleteLeitura);
Routers.post(
  "/api/leitura/upload",
  upload.single("file"),
  leituraController.uploadLeituras
);

export default Routers;
