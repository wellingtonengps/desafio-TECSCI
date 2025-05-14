import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const inversoresSeed = [
  { modelo: "Inversor A1", usinaId: 1 },
  { modelo: "Inversor A2", usinaId: 1 },
  { modelo: "Inversor A3", usinaId: 1 },
  { modelo: "Inversor A4", usinaId: 1 },
  { modelo: "Inversor B1", usinaId: 2 },
  { modelo: "Inversor B2", usinaId: 2 },
  { modelo: "Inversor B3", usinaId: 2 },
  { modelo: "Inversor B4", usinaId: 2 },
];

export const seedInversores = async () => {
  for (const inversor of inversoresSeed) {
    const exists = await prisma.inversor.findFirst({
      where: { modelo: inversor.modelo },
    });

    if (!exists) {
      await prisma.inversor.create({ data: inversor });
      console.log(`Inversor "${inversor.modelo}" criado`);
    } else {
      console.log(`Inversor "${inversor.modelo}" já existe`);
    }
  }
};
