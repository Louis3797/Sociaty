/*
  Warnings:

  - You are about to drop the `_user1_blocked_user2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user1_follows_user2` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `displayName` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_user1_blocked_user2` DROP FOREIGN KEY `_user1_blocked_user2_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_user1_blocked_user2` DROP FOREIGN KEY `_user1_blocked_user2_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_user1_follows_user2` DROP FOREIGN KEY `_user1_follows_user2_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_user1_follows_user2` DROP FOREIGN KEY `_user1_follows_user2_ibfk_2`;

-- AlterTable
ALTER TABLE `user` MODIFY `displayName` VARCHAR(25) NOT NULL;

-- DropTable
DROP TABLE `_user1_blocked_user2`;

-- DropTable
DROP TABLE `_user1_follows_user2`;

-- CreateTable
CREATE TABLE `_UserBlocked` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserBlocked_AB_unique`(`A`, `B`),
    INDEX `_UserBlocked_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserFollows` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserFollows_AB_unique`(`A`, `B`),
    INDEX `_UserFollows_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserBlocked` ADD FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserBlocked` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserFollows` ADD FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserFollows` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
