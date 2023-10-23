/*
  Warnings:

  - You are about to drop the column `veiw` on the `Room` table. All the data in the column will be lost.
  - Added the required column `view` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Room` DROP COLUMN `veiw`,
    ADD COLUMN `view` VARCHAR(191) NOT NULL;
