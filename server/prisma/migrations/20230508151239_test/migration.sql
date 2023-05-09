/*
  Warnings:

  - The primary key for the `Creator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creator_id` on the `Creator` table. All the data in the column will be lost.
  - You are about to drop the column `creator_id` on the `Recording` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `Creator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creator_uid` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recording" DROP CONSTRAINT "Recording_creator_id_fkey";

-- AlterTable
ALTER TABLE "Creator" DROP CONSTRAINT "Creator_pkey",
DROP COLUMN "creator_id",
ADD CONSTRAINT "Creator_pkey" PRIMARY KEY ("uid");

-- AlterTable
ALTER TABLE "Recording" DROP COLUMN "creator_id",
ADD COLUMN     "creator_uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Creator_uid_key" ON "Creator"("uid");

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_creator_uid_fkey" FOREIGN KEY ("creator_uid") REFERENCES "Creator"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
