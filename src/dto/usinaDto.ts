type UsinaResponse = {
  id: number;
  nome: string;
};

type UsinaRequest = {
  nome: string;
};

interface UsinaService {
  createUsina(data: UsinaRequest): Promise<UsinaResponse>;
  updateUsina(data: UsinaResponse): Promise<UsinaResponse>;
  deleteUsina(id: number): Promise<void>;
  getAllUsina(): Promise<UsinaResponse[]>;
  getUsina(id: number): Promise<UsinaResponse | null>;
}

interface UsinaRepository {
  createUsina(data: UsinaRequest): Promise<UsinaResponse>;
  updateUsina(data: UsinaResponse): Promise<UsinaResponse>;
  deleteUsina(id: number): Promise<void>;
  getAllUsina(): Promise<UsinaResponse[]>;
  getUsina(id: number): Promise<UsinaResponse | null>;
}

export { UsinaResponse, UsinaRequest, UsinaService, UsinaRepository };
