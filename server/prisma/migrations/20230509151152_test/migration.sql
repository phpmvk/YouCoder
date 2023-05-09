/*
  Warnings:

  - You are about to drop the column `public` on the `Recording` table. All the data in the column will be lost.
  - Added the required column `published` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recording" DROP COLUMN "public",
ADD COLUMN     "published" BOOLEAN NOT NULL;
