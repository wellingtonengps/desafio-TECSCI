import { prisma } from "../index";
import {
  InversorRepository,
  InversorRequest,
  InversorResponse,
} from "../dto/inversorDto";
import { LeituraRepository, LeituraResponse } from "../dto/leituraDto";
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
    modelo: inversor.modelo ?? "", // Garante string
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

const getLeituraMediaTemperaturaPorDia = async (
  inversorId: number,
  dataInicio: Date,
  dataFim: Date
) => {
  const resultados = await prisma.$queryRaw<
    { dia: Date; media_temperatura: number }[]
  >`
    SELECT 
      DATE("datetime") AS dia,
      AVG("temperaturaCelsius") AS media_temperatura
    FROM "Leitura"
    WHERE 
      "inversorId" = ${inversorId}
      AND "datetime" BETWEEN ${dataInicio} AND ${dataFim}
    GROUP BY dia
    ORDER BY dia;
  `;

  return resultados.map((r: { dia: Date; media_temperatura: number }) => ({
    dia: r.dia,
    mediaTemperatura: r.media_temperatura,
  }));
};

const getPotenciaMaximaPorDia = async (
  inversorId: number,
  dataInicio: Date,
  dataFim: Date
) => {
  const resultados = await prisma.$queryRaw<
    { dia: Date; potencia_maxima: number }[]
  >`
    SELECT 
      DATE("datetime") AS dia,
      MAX("potenciaAtivaWatt") AS potencia_maxima
    FROM "Leitura"
    WHERE 
      "inversorId" = ${inversorId}
      AND "datetime" BETWEEN ${dataInicio} AND ${dataFim}
    GROUP BY dia
    ORDER BY dia;
  `;

  return resultados.map((r: { dia: Date; potencia_maxima: number }) => ({
    dia: r.dia,
    potenciaMaxima: r.potencia_maxima,
  }));
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
    inversor_Id: inversorId,
    data_inicio: dataInicio,
    data_fim: dataFim,
    totalGerado: calcInvertersGeneration([entityWithPower]),
  };
};

export const inversorRepositories: InversorRepository = {
  createInversor,
  updateInversor,
  deleteInversor,
  getAllInversor,
  getLeituraMediaTemperaturaPorDia,
  getInversor,
  getPotenciaMaximaPorDia,
  getGeracaoInversor,
};
