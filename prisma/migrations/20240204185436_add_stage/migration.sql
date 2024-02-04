-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('SCREENING', 'TESTING', 'EVALUATING', 'OFFERING', 'CLOSING');

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "stage" "Stage";
