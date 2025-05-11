import { UsinaRequest, UsinaResponse, UsinaService } from "../dto/usinaDto";
import { usinaRepositories } from "../repositories/usinaRepository";

const createUsina = async ({ nome }: UsinaRequest): Promise<UsinaResponse> => {
  return await usinaRepositories.createUsina({ nome });
};

const updateUsina = async ({
  id,
  nome,
}: UsinaResponse): Promise<UsinaResponse> => {
  return await usinaRepositories.updateUsina({ id, nome });
};

const deleteUsina = async (id: number): Promise<void> => {
  await usinaRepositories.deleteUsina(id);
};

const getAllUsina = async (): Promise<UsinaResponse[]> => {
  return await usinaRepositories.getAllUsina();
};

const getUsina = async (id: number): Promise<UsinaResponse> => {
  const usina = await usinaRepositories.getUsina(id);
  if (!usina) {
    throw new Error("Usina não encontrada");
  }
  return usina;
};

export const usinaService: UsinaService = {
  createUsina,
  updateUsina,
  deleteUsina,
  getAllUsina,
  getUsina,
};
