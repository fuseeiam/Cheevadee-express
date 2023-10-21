/*
  Warnings:

  - You are about to drop the column `payment_slip` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `amount_room` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `room_size` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `roomtype_id` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomSize` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomtype` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `payment_slip`,
    DROP COLUMN `payment_status`,
    DROP COLUMN `room_id`,
    ADD COLUMN `paymentSlip` VARCHAR(191) NULL,
    ADD COLUMN `paymentStatus` ENUM('COMPLETED', 'CHECKING', 'PENDING') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `roomId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Room` DROP COLUMN `amount_room`,
    DROP COLUMN `room_size`,
    DROP COLUMN `roomtype_id`,
    ADD COLUMN `roomSize` VARCHAR(191) NOT NULL,
    ADD COLUMN `roomtype` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `Admin`;

-- DropTable
DROP TABLE `RoomType`;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
