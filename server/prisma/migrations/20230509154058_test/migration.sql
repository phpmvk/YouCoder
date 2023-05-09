/*
  Warnings:

  - Added the required column `created_at` to the `Recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_link` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recording" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "full_link" TEXT NOT NULL;
