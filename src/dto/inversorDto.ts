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
}

export {
  InversorResponse,
  InversorRequest,
  InversorService,
  InversorRepository,
};
