/*
  Warnings:

  - You are about to drop the column `username` on the `Creator` table. All the data in the column will be lost.
  - You are about to drop the column `header` on the `Recording` table. All the data in the column will be lost.
  - Added the required column `display_name` to the `Creator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Creator" DROP COLUMN "username",
ADD COLUMN     "display_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recording" DROP COLUMN "header",
ADD COLUMN     "title" TEXT NOT NULL;
