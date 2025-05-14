import {
  LeituraRequest,
  LeituraResponse,
  LeituraService,
} from "../dto/leituraDto";
import { leituraRepositories } from "../repositories/leituraRepository";

import * as fs from "fs";

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

const uploadLeituras = async (buffer: Buffer): Promise<string[]> => {
  const errorLogs: string[] = [];

  const jsonData = JSON.parse(buffer.toString());

  const normalizedData: LeituraRequest[] = jsonData.map((item: any) => ({
    datetime: item.datetime["$date"],
    inversorId: item.inversor_id,
    potenciaAtivaWatt: item.potencia_ativa_watt,
    temperaturaCelsius: item.temperatura_celsius,
  }));

  for (const leitura of normalizedData) {
    try {
      await leituraRepositories.createLeitura(leitura);
    } catch (error) {
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

  return errorLogs;
};

export const leituraService: LeituraService = {
  createLeitura,
  deleteLeitura,
  getAllLeitura,
  getLeitura,
  uploadLeituras,
};
