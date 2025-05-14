import { prisma } from "../index";
import {
  InversorRepository,
  InversorRequest,
  InversorResponse,
} from "../dto/inversorDto";
import {
  calcInvertersGeneration,
  EntityWithPower,
  TimeseriesValue,
} from "../utils/calcInvertersGeneration";

const createInversor = async ({ modelo, usinaId }: InversorRequest) => {
  const inversor = await prisma.inversor.create({
    data: { modelo, usinaId },
  });

  return {
    id: inversor.id,
    modelo: inversor.modelo ?? "",
    usinaId: inversor.usinaId,
  };
};

const updateInversor = async ({ id, modelo, usinaId }: InversorResponse) => {
  const inversor = await prisma.inversor.update({
    where: { id },
    data: { modelo, usinaId },
  });

  return {
    id: inversor.id,
    modelo: inversor.modelo ?? "",
    usinaId: inversor.usinaId,
  };
};

const deleteInversor = async (id: number) => {
  await prisma.inversor.delete({ where: { id } });
};

const getAllInversor = async () => {
  const inversores = await prisma.inversor.findMany();
  return inversores.map(({ id, modelo, usinaId }) => ({
    id: id,
    modelo: modelo ?? "",
    usinaId: usinaId,
  }));
};

const getInversor = async (id: number) => {
  const inversor = await prisma.inversor.findUnique({
    where: { id },
  });

  if (!inversor) return null;

  return {
    id: inversor.id,
    modelo: inversor.modelo ?? "",
    usinaId: inversor.usinaId,
  };
};

const getTemperaturaMedia = async (
  inversorId: number,
  dataInicio: Date,
  dataFim: Date
) => {
  const leituras = await prisma.leitura.findMany({
    where: {
      inversorId,
      datetime: {
        gte: dataInicio,
        lte: dataFim,
      },
    },
    select: {
      datetime: true,
      temperaturaCelsius: true,
    },
  });

  const agrupadoPorDia = new Map<string, number[]>();

  leituras.forEach(({ datetime, temperaturaCelsius }) => {
    const diaStr = datetime.toISOString().split("T")[0];
    if (!agrupadoPorDia.has(diaStr)) {
      agrupadoPorDia.set(diaStr, []);
    }
    agrupadoPorDia.get(diaStr)?.push(temperaturaCelsius);
  });

  const resultado = Array.from(agrupadoPorDia.entries())
    .map(([dia, temperaturas]) => {
      const soma = temperaturas.reduce((acc, t) => acc + t, 0);
      const media = soma / temperaturas.length;
      return {
        dia: new Date(dia),
        temperatura_media: media,
      };
    })
    .sort((a, b) => a.dia.getTime() - b.dia.getTime());

  return resultado;
};

const getPotenciaMaxima = async (
  inversorId: number,
  dataInicio: Date,
  dataFim: Date
) => {
  const resultados = await prisma.leitura.groupBy({
    by: ["datetime"],
    where: {
      inversorId: inversorId,
      datetime: {
        gte: dataInicio,
        lte: dataFim,
      },
    },
    _max: {
      potenciaAtivaWatt: true,
    },
  });

  const agrupadoPorDia = new Map<string, number>();

  resultados.forEach((resultado) => {
    const dia = resultado.datetime.toISOString().split("T")[0]; // deixa apenas o 'YYYY-MM-DD'
    const potenciaAtual = resultado._max.potenciaAtivaWatt ?? 0;

    const potenciaAnterior = agrupadoPorDia.get(dia) ?? 0;
    if (potenciaAtual > potenciaAnterior) {
      agrupadoPorDia.set(dia, potenciaAtual);
    }
  });

  const resultadoFinal = Array.from(agrupadoPorDia.entries())
    .map(([dia, potenciaMaxima]) => ({
      dia: new Date(dia),
      potencia_maxima: potenciaMaxima,
    }))
    .sort((a, b) => a.dia.getTime() - b.dia.getTime());

  return resultadoFinal;
};

const getGeracaoInversor = async (
  inversorId: number,
  dataInicio: Date,
  dataFim: Date
) => {
  const leituras = await prisma.leitura.findMany({
    where: {
      inversorId,
      datetime: {
        gte: dataInicio,
        lte: dataFim,
      },
    },
    select: {
      datetime: true,
      potenciaAtivaWatt: true,
    },
    orderBy: {
      datetime: "asc",
    },
  });

  const timeseries: TimeseriesValue[] = leituras.map((leitura) => ({
    date: leitura.datetime,
    value: leitura.potenciaAtivaWatt,
  }));

  const entityWithPower: EntityWithPower = {
    power: timeseries,
  };

  return {
    inversor_id: inversorId,
    data_inicio: dataInicio,
    data_fim: dataFim,
    total_gerado: calcInvertersGeneration([entityWithPower]),
  };
};

export const inversorRepositories: InversorRepository = {
  createInversor,
  updateInversor,
  deleteInversor,
  getAllInversor,
  getTemperaturaMedia,
  getInversor,
  getPotenciaMaxima,
  getGeracaoInversor,
};
