import { prisma } from "../index";
import { UsinaRepository, UsinaRequest, UsinaResponse } from "../dto/usinaDto";

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

export const usinaRepositories: UsinaRepository = {
  createUsina,
  updateUsina,
  deleteUsina,
  getAllUsina,
  getUsina,
};
