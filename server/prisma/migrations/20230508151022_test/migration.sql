/*
  Warnings:

  - Added the required column `uid` to the `Creator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Creator" ADD COLUMN     "uid" TEXT NOT NULL;
