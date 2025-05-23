import {
  InversorRequest,
  InversorResponse,
  InversorService,
} from "../dto/inversorDto";
import { inversorRepositories } from "../repositories/inversorRepository";

const createInversor = async ({
  modelo,
  usinaId,
}: InversorRequest): Promise<InversorResponse> => {
  return await inversorRepositories.createInversor({ modelo, usinaId });
};

const updateInversor = async ({
  id,
  modelo,
  usinaId,
}: InversorResponse): Promise<InversorResponse> => {
  return await inversorRepositories.updateInversor({ id, modelo, usinaId });
};

const deleteInversor = async (id: number): Promise<void> => {
  await inversorRepositories.deleteInversor(id);
};

const getAllInversor = async (): Promise<InversorResponse[]> => {
  return await inversorRepositories.getAllInversor();
};

const getInversor = async (id: number): Promise<InversorResponse> => {
  const inversor = await inversorRepositories.getInversor(id);
  if (!inversor) {
    throw new Error("Inversor não encontrado");
  }
  return inversor;
};

const getTemperaturaMedia = async (
  inversorId: number,
  dataInicio: Date,
  dataFim: Date
) => {
  return await inversorRepositories.getTemperaturaMedia(
    inversorId,
    dataInicio,
    dataFim
  );
};

const getPotenciaMaxima = async (
  inversorId: number,
  dataInicio: Date,
  dataFim: Date
) => {
  return await inversorRepositories.getPotenciaMaxima(
    inversorId,
    dataInicio,
    dataFim
  );
};

const getGeracaoInversor = async (
  inversorId: number,
  dataInicio: Date,
  dataFim: Date
) => {
  return await inversorRepositories.getGeracaoInversor(
    inversorId,
    dataInicio,
    dataFim
  );
};

export const inversorService: InversorService = {
  createInversor,
  updateInversor,
  deleteInversor,
  getAllInversor,
  getInversor,
  getTemperaturaMedia,
  getPotenciaMaxima,
  getGeracaoInversor,
};
