import { Request, Response } from "express";
import { usinaService } from "../services/usinaService";

const getAllUsinas = async (req: Request, res: Response) => {
  try {
    const usinas = await usinaService.getAllUsina();
    res.status(200).json(usinas);
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar as usinas" });
  }
};

const getUsina = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const usina = await usinaService.getUsina(id);
    res.status(200).json(usina);
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar a usina" });
  }
};

const createUsina = async (req: Request, res: Response) => {
  const { nome } = req.body;
  try {
    const usina = await usinaService.createUsina({ nome });
    res.status(201).json(usina);
  } catch (error) {
    res.status(500).json({ error: "Falha ao criar a usina" });
  }
};

const updateUsina = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nome } = req.body;
  try {
    const usina = await usinaService.updateUsina({ id, nome });
    res.status(200).json(usina);
  } catch (error) {
    res.status(500).json({ error: "Falha ao atualizar a usina" });
  }
};

const deleteUsina = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await usinaService.deleteUsina(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Falha ao deletar a usina" });
  }
};

const getGeracaoUsina = async (req: Request, res: Response) => {
  try {
    const { usina_id, data_inicio, data_fim } = req.query;

    if (!usina_id || !data_inicio || !data_fim) {
      res.status(400).json({
        error: "Parâmetros obrigatórios: usina_id, data_inicio, data_fim.",
      });
    }

    const usinaId = Number(usina_id);
    const dataInicio = new Date(data_inicio as string);
    const dataFim = new Date(data_fim as string);

    if (
      isNaN(usinaId) ||
      isNaN(dataInicio.getTime()) ||
      isNaN(dataFim.getTime())
    ) {
      res.status(400).json({ error: "Parâmetros inválidos." });
    }

    const resultado = await usinaService.getGeracaoUsina(
      usinaId,
      dataInicio,
      dataFim
    );
    res.status(200).json(resultado);
  } catch (error: any) {
    console.error("Erro ao obter média de temperatura por dia:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export default {
  getAllUsinas,
  getUsina,
  createUsina,
  updateUsina,
  deleteUsina,
  getGeracaoUsina,
};
