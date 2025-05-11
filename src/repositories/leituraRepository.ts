import { prisma } from "../index";
import { LeituraRepository, LeituraRequest } from "../dto/leituraDto";

const createLeitura = async ({
  datetime,
  inversorId,
  potenciaAtivaWatt,
  temperaturaCelsius,
}: LeituraRequest) => {
  return prisma.leitura.create({
    data: {
      datetime,
      inversorId,
      potenciaAtivaWatt,
      temperaturaCelsius,
    },
  });
};

const deleteLeitura = async (id: number) => {
  await prisma.leitura.delete({ where: { id } });
};

const getAllLeitura = async () => {
  return prisma.leitura.findMany();
};

const getLeitura = async (id: number) => {
  return prisma.leitura.findUnique({ where: { id } });
};

export const leituraRepositories: LeituraRepository = {
  createLeitura,
  deleteLeitura,
  getAllLeitura,
  getLeitura,
};
