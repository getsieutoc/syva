/*
  Warnings:

  - You are about to drop the `_InterviewToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_JobToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `candidateId` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_InterviewToUser" DROP CONSTRAINT "_InterviewToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_InterviewToUser" DROP CONSTRAINT "_InterviewToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_JobToUser" DROP CONSTRAINT "_JobToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_JobToUser" DROP CONSTRAINT "_JobToUser_B_fkey";

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "candidateId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_InterviewToUser";

-- DropTable
DROP TABLE "_JobToUser";

-- CreateTable
CREATE TABLE "_BoardOnInterviews" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoardOnInterviews_AB_unique" ON "_BoardOnInterviews"("A", "B");

-- CreateIndex
CREATE INDEX "_BoardOnInterviews_B_index" ON "_BoardOnInterviews"("B");

-- CreateIndex
CREATE INDEX "Interview_jobId_candidateId_idx" ON "Interview"("jobId", "candidateId");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardOnInterviews" ADD CONSTRAINT "_BoardOnInterviews_A_fkey" FOREIGN KEY ("A") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardOnInterviews" ADD CONSTRAINT "_BoardOnInterviews_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
