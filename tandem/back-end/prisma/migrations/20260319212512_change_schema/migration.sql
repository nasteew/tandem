/*
  Warnings:

  - You are about to drop the column `bestTimeMs` on the `UserStatsWidget` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `UserStatsWidget` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,widget]` on the table `UserStatsWidget` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserStatsWidget_userId_widget_difficulty_key";

-- AlterTable
ALTER TABLE "UserStatsWidget" DROP COLUMN "bestTimeMs",
DROP COLUMN "difficulty",
ALTER COLUMN "lastLevel" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserStatsWidget_userId_widget_key" ON "UserStatsWidget"("userId", "widget");
