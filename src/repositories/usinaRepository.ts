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

  // Agrupa leituras por inversorId
  const leiturasPorInversor: Record<number, TimeseriesValue[]> = {};

  leituras.forEach((leitura) => {
    if (!leiturasPorInversor[leitura.inversorId]) {
      leiturasPorInversor[leitura.inversorId] = [];
    }

    leiturasPorInversor[leitura.inversorId].push({
      date: leitura.datetime,
      value: leitura.potenciaAtivaWatt,
    });
  });

  // Cria um EntityWithPower para cada inversor
  const entidades: EntityWithPower[] = Object.values(leiturasPorInversor).map(
    (timeseries) => ({
      power: timeseries,
    })
  );

  const total_gerado = calcInvertersGeneration(entidades);

  return {
    usina_id: usinaId,
    data_inicio: dataInicio,
    data_fim: dataFim,
    total_gerado,
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
