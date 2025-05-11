type LeituraResponse = {
  id: number;
  datetime: Date;
  inversorId: number;
  potenciaAtivaWatt: number;
  temperaturaCelsius: number;
};

type LeituraRequest = {
  datetime: Date;
  inversorId: number;
  potenciaAtivaWatt: number;
  temperaturaCelsius: number;
};

interface LeituraService {
  createLeitura(data: LeituraRequest): Promise<LeituraResponse>;
  deleteLeitura(id: number): Promise<void>;
  getAllLeitura(): Promise<LeituraResponse[]>;
  getLeitura(id: number): Promise<LeituraResponse | null>;
}

interface LeituraRepository {
  createLeitura(data: LeituraRequest): Promise<LeituraResponse>;
  deleteLeitura(id: number): Promise<void>;
  getAllLeitura(): Promise<LeituraResponse[]>;
  getLeitura(id: number): Promise<LeituraResponse | null>;
}

export { LeituraResponse, LeituraRequest, LeituraService, LeituraRepository };
