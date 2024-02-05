/*
  Warnings:

  - You are about to drop the column `expiredIn` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "expiredIn",
ADD COLUMN     "expiredAt" TIMESTAMP(3);
