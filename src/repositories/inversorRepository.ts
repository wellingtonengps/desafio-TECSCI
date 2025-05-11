import { prisma } from "../index";
import {
  InversorRepository,
  InversorRequest,
  InversorResponse,
} from "../dto/inversorDto";

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
    id,
    modelo: modelo ?? "",
    usinaId,
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

export const inversorRepositories: InversorRepository = {
  createInversor,
  updateInversor,
  deleteInversor,
  getAllInversor,
  getInversor,
};
