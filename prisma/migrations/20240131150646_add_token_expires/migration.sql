-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "oauth_token" TEXT,
ADD COLUMN     "oauth_token_secret" TEXT,
ADD COLUMN     "refresh_token_expires_in" INTEGER;

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");
