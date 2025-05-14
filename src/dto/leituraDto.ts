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

interface FileRequest extends Request {
  file: Express.Multer.File;
}

interface LeituraService {
  createLeitura(data: LeituraRequest): Promise<LeituraResponse>;
  deleteLeitura(id: number): Promise<void>;
  getAllLeitura(): Promise<LeituraResponse[]>;
  getLeitura(id: number): Promise<LeituraResponse | null>;
  uploadLeituras(file: Buffer): Promise<string[]>;
}

interface LeituraRepository {
  createLeitura(data: LeituraRequest): Promise<LeituraResponse>;
  deleteLeitura(id: number): Promise<void>;
  getAllLeitura(): Promise<LeituraResponse[]>;
  getLeitura(id: number): Promise<LeituraResponse | null>;
}

export { LeituraResponse, LeituraRequest, LeituraService, LeituraRepository };
