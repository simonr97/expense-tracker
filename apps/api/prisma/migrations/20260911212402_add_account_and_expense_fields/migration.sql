-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('Completed', 'Pending');

-- CreateTable (Account es tabla nueva, sin filas previas, no hay conflicto)
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");

-- Insertar la cuenta genérica ANTES de tocar Expense
INSERT INTO "Account" ("id", "name") VALUES (gen_random_uuid()::text, 'Santander');

-- AlterTable Category: agregar columnas SIN NOT NULL todavía
ALTER TABLE "Category" ADD COLUMN     "color" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Rellenar las categorías existentes
UPDATE "Category" SET "color" = '#EF4444', "icon" = 'utensils' WHERE "name" = 'comida';
UPDATE "Category" SET "color" = '#3B82F6', "icon" = 'credit-card' WHERE "name" = 'suscripciones';
UPDATE "Category" SET "color" = '#8B5CF6', "icon" = 'shopping-cart' WHERE "name" = 'supermercado';
UPDATE "Category" SET "color" = '#6B7280', "icon" = 'car' WHERE "name" = 'auto';
UPDATE "Category" SET "color" = '#10B981', "icon" = 'home' WHERE "name" = 'hogar';

-- Recién ahora, forzar NOT NULL
ALTER TABLE "Category" ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "icon" SET NOT NULL;

-- AlterTable Expense: agregar columnas SIN NOT NULL todavía (excepto las que ya tienen default)
ALTER TABLE "Expense" DROP COLUMN "date",
ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" "ExpenseStatus" NOT NULL DEFAULT 'Completed',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Rellenar accountId con la cuenta genérica
UPDATE "Expense" SET "accountId" = (SELECT "id" FROM "Account" WHERE "name" = 'Santander');

-- Recién ahora, forzar NOT NULL
ALTER TABLE "Expense" ALTER COLUMN "accountId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;