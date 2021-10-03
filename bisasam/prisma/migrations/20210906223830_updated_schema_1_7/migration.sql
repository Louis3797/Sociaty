/*
  Warnings:

  - You are about to drop the `_userfollows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_userfollows` DROP FOREIGN KEY `_userfollows_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_userfollows` DROP FOREIGN KEY `_userfollows_ibfk_2`;

-- DropTable
DROP TABLE `_userfollows`;

-- CreateTable
CREATE TABLE `UserFollows` (
    `followerId` VARCHAR(191) NOT NULL,
    `followingId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`followerId`, `followingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserFollows` ADD FOREIGN KEY (`followerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFollows` ADD FOREIGN KEY (`followingId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
