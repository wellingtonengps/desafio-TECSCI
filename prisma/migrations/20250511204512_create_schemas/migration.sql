/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Usina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inversor" (
    "id" INTEGER NOT NULL,
    "modelo" TEXT,
    "usinaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inversor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leitura" (
    "id" SERIAL NOT NULL,
    "inversorId" INTEGER NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "potenciaAtivaWatt" DOUBLE PRECISION NOT NULL,
    "temperaturaCelsius" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leitura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Leitura_inversorId_datetime_idx" ON "Leitura"("inversorId", "datetime");

-- AddForeignKey
ALTER TABLE "Inversor" ADD CONSTRAINT "Inversor_usinaId_fkey" FOREIGN KEY ("usinaId") REFERENCES "Usina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leitura" ADD CONSTRAINT "Leitura_inversorId_fkey" FOREIGN KEY ("inversorId") REFERENCES "Inversor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
