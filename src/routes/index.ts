import { Router } from "express";
import usinaController from "../controllers/usinaController";
import inversorController from "../controllers/inversorController";
import leituraController from "../controllers/leituraController";
import * as fs from "fs";

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
  "/api/inversor/temperatura/media",
  inversorController.getLeituraMediaTemperaturaPorDia
);
Routers.get(
  "/api/inversor/potenciaMaxima",
  inversorController.getPotenciaMaximaPorDia
);
Routers.get("/api/inversor/geracao", inversorController.getGeracaoInversor);

Routers.get("/api/leitura", leituraController.getAllLeituras);
Routers.get("/api/leitura/:id", leituraController.getLeitura);
Routers.post("/api/leitura", leituraController.createLeitura);
Routers.delete("/api/leitura/:id", leituraController.deleteLeitura);

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

Routers.post(
  "/api/leitura/upload",
  upload.single("file"),
  leituraController.uploadLeituras
);
/*
Routers.post(
  "/api/leitura/upload",
  upload.single("file"),
  async (req: any, res) => {
    const errorLogs: string[] = [];

    try {
      const jsonData = JSON.parse(req.file.buffer.toString());

      const normalizedData = jsonData.map((item: any) => ({
        datetime: item.datetime["$date"],
        inversorId: item.inversor_id,
        potenciaAtivaWatt: item.potencia_ativa_watt,
        temperaturaCelsius: item.temperatura_celsius,
      }));

      for (const leitura of normalizedData) {
        try {
          console.log(leitura);
          await leituraController.createLeituraInterno(leitura);
        } catch (leituraError: any) {
          const timestamp = new Date().toISOString();
          const errorMsg = `[${timestamp}] Erro ao inserir leitura: ${JSON.stringify(
            leitura
          )}`;
          console.error(errorMsg);
          errorLogs.push(errorMsg);
        }
      }

      if (errorLogs.length > 0) {
        const logFile = __dirname + "/upload_errors.log"; // Caminho direto
        const logContent = errorLogs.join("\n") + "\n";
        fs.appendFileSync(logFile, logContent, "utf8");
      }

      res.status(200).json({
        message: "Processamento finalizado.",
        erros: errorLogs.length,
        detalhes: errorLogs.length
          ? "Erros foram salvos em upload_errors.log"
          : "Nenhum erro encontrado",
      });
    } catch (err: any) {
      res.status(400).json({ error: "Erro geral: " + err.message });
    }
  }
);*/

export default Routers;
