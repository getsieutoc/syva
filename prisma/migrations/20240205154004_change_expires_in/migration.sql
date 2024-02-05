/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `Job` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Stage" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "expiredAt",
ADD COLUMN     "expiredIn" INTEGER NOT NULL DEFAULT 30,
ALTER COLUMN "isRemote" SET DEFAULT true;
