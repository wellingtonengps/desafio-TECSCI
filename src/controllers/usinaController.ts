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

export default {
  getAllUsinas,
  getUsina,
  createUsina,
  updateUsina,
  deleteUsina,
};
