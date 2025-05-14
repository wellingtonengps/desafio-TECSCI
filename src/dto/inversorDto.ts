type InversorResponse = {
  id: number;
  modelo: string;
  usinaId: number;
};

type InversorRequest = {
  modelo: string;
  usinaId: number;
};

type IntervalParams = {
  inversorId: number;
  dataInicio: Date;
  dataFim: Date;
};

interface InversorService {
  createInversor(data: InversorRequest): Promise<InversorResponse>;
  updateInversor(data: InversorResponse): Promise<InversorResponse>;
  deleteInversor(id: number): Promise<void>;
  getAllInversor(): Promise<InversorResponse[]>;
  getInversor(id: number): Promise<InversorResponse | null>;
  getTemperaturaMedia(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{ dia: Date; mediaTemperatura: number }[]>;
  getPotenciaMaxima(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{ dia: Date; potencia_maxima: number }[]>;
  getGeracaoInversor(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{
    inversor_id: number;
    data_inicio: Date;
    data_fim: Date;
    total_gerado: number;
  }>;
}

interface InversorRepository {
  createInversor(data: InversorRequest): Promise<InversorResponse>;
  updateInversor(data: InversorResponse): Promise<InversorResponse>;
  deleteInversor(id: number): Promise<void>;
  getAllInversor(): Promise<InversorResponse[]>;
  getInversor(id: number): Promise<InversorResponse | null>;
  getTemperaturaMedia(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{ dia: Date; mediaTemperatura: number }[]>;
  getPotenciaMaxima(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{ dia: Date; potencia_maxima: number }[]>;
  getGeracaoInversor(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{
    inversor_id: number;
    data_inicio: Date;
    data_fim: Date;
    total_gerado: number;
  }>;
}

export {
  InversorResponse,
  InversorRequest,
  InversorService,
  InversorRepository,
};
