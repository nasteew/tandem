/*
  Warnings:

  - A unique constraint covering the columns `[userId,widget,difficulty,level]` on the table `UserLevelProgress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,widget,difficulty]` on the table `UserStatsWidget` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `difficulty` to the `UserLevelProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `UserStatsWidget` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserLevelProgress_userId_widget_level_key";

-- DropIndex
DROP INDEX "UserStatsWidget_userId_widget_key";

-- AlterTable
ALTER TABLE "UserLevelProgress" ADD COLUMN     "difficulty" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserStatsWidget" ADD COLUMN     "difficulty" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserLevelProgress_userId_widget_difficulty_level_key" ON "UserLevelProgress"("userId", "widget", "difficulty", "level");

-- CreateIndex
CREATE UNIQUE INDEX "UserStatsWidget_userId_widget_difficulty_key" ON "UserStatsWidget"("userId", "widget", "difficulty");
