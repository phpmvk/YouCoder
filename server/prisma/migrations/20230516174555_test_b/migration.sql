/*
  Warnings:

  - You are about to drop the `CreatorSocials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CreatorSocials" DROP CONSTRAINT "CreatorSocials_creator_uid_fkey";

-- AlterTable
ALTER TABLE "Creator" ADD COLUMN     "socials" JSONB[];

-- DropTable
DROP TABLE "CreatorSocials";
