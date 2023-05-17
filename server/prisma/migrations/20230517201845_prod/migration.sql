/*
  Warnings:

  - The `socials` column on the `Creator` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Creator" DROP COLUMN "socials",
ADD COLUMN     "socials" JSONB;
