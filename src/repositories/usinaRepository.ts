import { prisma } from "../index";
import { UsinaRepository, UsinaRequest, UsinaResponse } from "../dto/usinaDto";
import {
  calcInvertersGeneration,
  EntityWithPower,
  TimeseriesValue,
} from "../utils/calcInvertersGeneration";

const createUsina = async ({ nome }: UsinaRequest) => {
  return prisma.usina.create({
    data: { nome },
  });
};

const updateUsina = async ({ id, nome }: UsinaResponse) => {
  return prisma.usina.update({
    where: { id },
    data: { nome },
  });
};

const deleteUsina = async (id: number) => {
  await prisma.usina.delete({ where: { id } });
};

const getAllUsina = async () => {
  return prisma.usina.findMany({
    include: { inversores: true },
  });
};

const getUsina = async (id: number) => {
  return prisma.usina.findUnique({
    where: { id },
    include: { inversores: true },
  });
};

const getGeracaoUsina = async (
  usinaId: number,
  dataInicio: Date,
  dataFim: Date
) => {
  const leituras = await prisma.leitura.findMany({
    where: {
      datetime: {
        gte: dataInicio,
        lte: dataFim,
      },
      inversor: {
        usinaId: usinaId,
      },
    },
    select: {
      inversorId: true,
      datetime: true,
      potenciaAtivaWatt: true,
    },
    orderBy: {
      datetime: "asc",
    },
  });

  console.log(leituras);

  const timeseries: TimeseriesValue[] = leituras.map((leitura) => ({
    date: leitura.datetime,
    value: leitura.potenciaAtivaWatt,
  }));

  console.log(timeseries);

  const entityWithPower: EntityWithPower = {
    power: timeseries,
  };

  return {
    usina_id: usinaId,
    data_inicio: dataInicio,
    data_fim: dataFim,
    total_gerado: calcInvertersGeneration([entityWithPower]),
  };
};

export const usinaRepositories: UsinaRepository = {
  createUsina,
  updateUsina,
  deleteUsina,
  getAllUsina,
  getUsina,
  getGeracaoUsina,
};
