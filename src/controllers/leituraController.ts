import { Request, Response } from "express";
import { leituraService } from "../services/leituraService";

const getAllLeituras = async (req: Request, res: Response) => {
  try {
    const leituras = await leituraService.getAllLeitura();
    res.status(200).json(leituras);
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar as leituras" });
  }
};

const getLeitura = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const leitura = await leituraService.getLeitura(id);
    res.status(200).json(leitura);
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar a leitura" });
  }
};

const createLeitura = async (req: Request, res: Response) => {
  const { datetime, inversor_id, potencia_ativa_watt, temperatura_celsius } =
    req.body;
  try {
    const leitura = await leituraService.createLeitura({
      datetime: datetime["$date"],
      inversorId: inversor_id,
      potenciaAtivaWatt: potencia_ativa_watt,
      temperaturaCelsius: temperatura_celsius,
    });
    res.status(201).json(leitura);
  } catch (error) {
    res.status(500).json({ error: "Falha ao criar a leitura" + error });
  }
};

const deleteLeitura = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await leituraService.deleteLeitura(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Falha ao deletar a leitura" });
  }
};

const uploadLeituras = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "Arquivo não enviado." });
    return;
  }

  try {
    const errorLogs = await leituraService.uploadLeituras(req.file.buffer);

    res.status(200).json({
      message: "Processamento finalizado.",
      erros: errorLogs.length,
      detalhes: errorLogs.length
        ? "Erros foram salvos em /logs/upload_errors.log"
        : "Nenhum erro encontrado",
    });
  } catch (err: any) {
    res.status(400).json({ error: "Erro geral: " + err.message });
  }
};

export default {
  getAllLeituras,
  getLeitura,
  createLeitura,
  deleteLeitura,
  uploadLeituras,
};
