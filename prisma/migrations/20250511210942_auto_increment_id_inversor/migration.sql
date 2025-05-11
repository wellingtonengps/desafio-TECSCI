-- AlterTable
CREATE SEQUENCE inversor_id_seq;
ALTER TABLE "Inversor" ALTER COLUMN "id" SET DEFAULT nextval('inversor_id_seq');
ALTER SEQUENCE inversor_id_seq OWNED BY "Inversor"."id";
