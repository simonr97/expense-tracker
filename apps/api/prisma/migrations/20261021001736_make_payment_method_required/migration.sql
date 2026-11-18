/*
  Warnings:

  - Made the column `paymentMethodId` on table `Expense` required. This step will fail if there are existing NULL values in that column.

*/

INSERT INTO "PaymentMethod" ("id","name","updatedAt","isSystem")
VALUES (gen_random_uuid()::text, 'Cash',now(),true);

UPDATE "Expense"
SET "paymentMethodId" = (SELECT "id" FROM "PaymentMethod" WHERE "name" = 'Cash');
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_paymentMethodId_fkey";

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "paymentMethodId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
