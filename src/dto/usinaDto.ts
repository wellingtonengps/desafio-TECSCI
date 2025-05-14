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
  getGeracaoUsina(
    usinaId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{
    usina_id: number;
    data_inicio: Date;
    data_fim: Date;
    total_gerado: number;
  }>;
}

interface UsinaRepository {
  createUsina(data: UsinaRequest): Promise<UsinaResponse>;
  updateUsina(data: UsinaResponse): Promise<UsinaResponse>;
  deleteUsina(id: number): Promise<void>;
  getAllUsina(): Promise<UsinaResponse[]>;
  getUsina(id: number): Promise<UsinaResponse | null>;

  getGeracaoUsina(
    usinaId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{
    usina_id: number;
    data_inicio: Date;
    data_fim: Date;
    total_gerado: number;
  }>;
}

export { UsinaResponse, UsinaRequest, UsinaService, UsinaRepository };
