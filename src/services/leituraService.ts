import {
  LeituraRequest,
  LeituraResponse,
  LeituraService,
} from "../dto/leituraDto";
import { leituraRepositories } from "../repositories/leituraRepository";

const createLeitura = async ({
  datetime,
  inversorId,
  potenciaAtivaWatt,
  temperaturaCelsius,
}: LeituraRequest): Promise<LeituraResponse> => {
  return await leituraRepositories.createLeitura({
    datetime,
    inversorId,
    potenciaAtivaWatt,
    temperaturaCelsius,
  });
};

const deleteLeitura = async (id: number): Promise<void> => {
  await leituraRepositories.deleteLeitura(id);
};

const getAllLeitura = async (): Promise<LeituraResponse[]> => {
  return await leituraRepositories.getAllLeitura();
};

const getLeitura = async (id: number): Promise<LeituraResponse> => {
  const leitura = await leituraRepositories.getLeitura(id);
  if (!leitura) {
    throw new Error("Leitura não encontrada");
  }
  return leitura;
};

export const leituraService: LeituraService = {
  createLeitura,
  deleteLeitura,
  getAllLeitura,
  getLeitura,
};
