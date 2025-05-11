import { Request, Response } from "express";
import { inversorService } from "../services/inversorService";

const getAllInversores = async (req: Request, res: Response) => {
  try {
    const inversores = await inversorService.getAllInversor();
    res.status(200).json(inversores);
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar os inversores" });
  }
};

const getInversor = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const inversor = await inversorService.getInversor(id);
    res.status(200).json(inversor);
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar o inversor" });
  }
};

const createInversor = async (req: Request, res: Response) => {
  const { modelo, usinaId } = req.body;
  try {
    const inversor = await inversorService.createInversor({ modelo, usinaId });
    res.status(201).json(inversor);
  } catch (error) {
    res.status(500).json({ error: "Falha ao criar o inversor" });
  }
};

const updateInversor = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { modelo, usinaId } = req.body;
  try {
    const inversor = await inversorService.updateInversor({
      id,
      modelo,
      usinaId,
    });
    res.status(200).json(inversor);
  } catch (error) {
    res.status(500).json({ error: "Falha ao atualizar o inversor" });
  }
};

const deleteInversor = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await inversorService.deleteInversor(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Falha ao deletar o inversor" });
  }
};

export default {
  getAllInversores,
  getInversor,
  createInversor,
  updateInversor,
  deleteInversor,
};
