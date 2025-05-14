import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const usinasSeed = [
  {
    nome: "Usina Solar Juiz de Fora",
  },
  {
    nome: "Usina Solar Belo Horizonte",
  },
];

export const seedUsinas = async () => {
  for (const usina of usinasSeed) {
    const exists = await prisma.usina.findFirst({
      where: { nome: usina.nome },
    });

    if (!exists) {
      await prisma.usina.create({ data: { nome: usina.nome } });
      console.log(`Usina "${usina.nome}" criada`);
    } else {
      console.log(`Usina "${usina.nome}" já existe`);
    }
  }
};
