/*
  Warnings:

  - You are about to drop the column `rootype_id` on the `Room` table. All the data in the column will be lost.
  - Added the required column `roomtype_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Room` DROP COLUMN `rootype_id`,
    ADD COLUMN `roomtype_id` INTEGER NOT NULL;
