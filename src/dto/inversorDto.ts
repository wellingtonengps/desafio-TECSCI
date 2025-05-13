type InversorResponse = {
  id: number;
  modelo: string;
  usinaId: number;
};

type InversorRequest = {
  modelo: string;
  usinaId: number;
};

interface InversorService {
  createInversor(data: InversorRequest): Promise<InversorResponse>;
  updateInversor(data: InversorResponse): Promise<InversorResponse>;
  deleteInversor(id: number): Promise<void>;
  getAllInversor(): Promise<InversorResponse[]>;
  getInversor(id: number): Promise<InversorResponse | null>;
  getLeituraMediaTemperaturaPorDia(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{ dia: Date; mediaTemperatura: number }[]>;
  getPotenciaMaximaPorDia(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{ dia: Date; potenciaMaxima: number }[]>;
  getGeracaoInversor(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{
    inversor_Id: number;
    data_inicio: Date;
    data_fim: Date;
    totalGerado: number;
  }>;
}

interface InversorRepository {
  createInversor(data: InversorRequest): Promise<InversorResponse>;
  updateInversor(data: InversorResponse): Promise<InversorResponse>;
  deleteInversor(id: number): Promise<void>;
  getAllInversor(): Promise<InversorResponse[]>;
  getInversor(id: number): Promise<InversorResponse | null>;
  getLeituraMediaTemperaturaPorDia(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{ dia: Date; mediaTemperatura: number }[]>;
  getPotenciaMaximaPorDia(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{ dia: Date; potenciaMaxima: number }[]>;
  getGeracaoInversor(
    inversorId: number,
    dataInicio: Date,
    dataFim: Date
  ): Promise<{
    inversor_Id: number;
    data_inicio: Date;
    data_fim: Date;
    totalGerado: number;
  }>;
}

export {
  InversorResponse,
  InversorRequest,
  InversorService,
  InversorRepository,
};
