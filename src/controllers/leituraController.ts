import { Request, Response } from "express";
import { leituraService } from "../services/leituraService";
import { LeituraRequest } from "../dto/leituraDto";

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
  const { datetime, inversorId, potenciaAtivaWatt, temperaturaCelsius } =
    req.body;
  try {
    const leitura = await leituraService.createLeitura({
      datetime,
      inversorId,
      potenciaAtivaWatt,
      temperaturaCelsius,
    });
    res.status(201).json(leitura);
  } catch (error) {
    res.status(500).json({ error: "Falha ao criar a leitura" });
  }
};

const createLeituraInterno = async (data: LeituraRequest) => {
  await leituraService.createLeitura(data);
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

export default {
  getAllLeituras,
  getLeitura,
  createLeitura,
  createLeituraInterno,
  deleteLeitura,
};
