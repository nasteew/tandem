-- DropForeignKey
ALTER TABLE "UserLevelProgress" DROP CONSTRAINT "UserLevelProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserStatsGlobal" DROP CONSTRAINT "UserStatsGlobal_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserStatsWidget" DROP CONSTRAINT "UserStatsWidget_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserStatsGlobal" ADD CONSTRAINT "UserStatsGlobal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStatsWidget" ADD CONSTRAINT "UserStatsWidget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLevelProgress" ADD CONSTRAINT "UserLevelProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
