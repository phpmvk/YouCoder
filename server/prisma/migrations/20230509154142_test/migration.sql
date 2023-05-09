/*
  Warnings:

  - Added the required column `iframe_link` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recording" ADD COLUMN     "iframe_link" TEXT NOT NULL;
