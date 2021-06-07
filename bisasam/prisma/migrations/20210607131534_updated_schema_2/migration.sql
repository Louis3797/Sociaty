/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `acc_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to alter the column `compound_id` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `provider_type` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `provider_id` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `provider_account_id` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `user_id` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `usersUser_id` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `message` table. All the data in the column will be lost.
  - You are about to alter the column `session_token` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `access_token` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `user_id` on the `user_comment` table. All the data in the column will be lost.
  - The primary key for the `user_in_group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user_in_group` table. All the data in the column will be lost.
  - The primary key for the `user_liked_comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user_liked_comment` table. All the data in the column will be lost.
  - The primary key for the `user_liked_content` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user_liked_content` table. All the data in the column will be lost.
  - You are about to alter the column `identifier` on the `verification_requests` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `token` on the `verification_requests` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_in_group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_liked_comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_liked_content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_user1_blocked_user2` DROP FOREIGN KEY `_user1_blocked_user2_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_user1_blocked_user2` DROP FOREIGN KEY `_user1_blocked_user2_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_user1_follows_user2` DROP FOREIGN KEY `_user1_follows_user2_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_user1_follows_user2` DROP FOREIGN KEY `_user1_follows_user2_ibfk_2`;

-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `content_ibfk_1`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_in_group` DROP FOREIGN KEY `user_in_group_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_liked_comment` DROP FOREIGN KEY `user_liked_comment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_liked_content` DROP FOREIGN KEY `user_liked_content_ibfk_1`;

-- AlterTable
ALTER TABLE `accounts` DROP PRIMARY KEY,
    DROP COLUMN `acc_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `compound_id` VARCHAR(191) NOT NULL,
    MODIFY `provider_type` VARCHAR(191) NOT NULL,
    MODIFY `provider_id` VARCHAR(191) NOT NULL,
    MODIFY `provider_account_id` VARCHAR(191) NOT NULL,
    MODIFY `refresh_token` VARCHAR(191),
    MODIFY `access_token` VARCHAR(191),
    MODIFY `access_token_expires` DATETIME(3),
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `content` DROP COLUMN `user_id`,
    DROP COLUMN `usersUser_id`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sessions` MODIFY `expires` DATETIME(3) NOT NULL,
    MODIFY `session_token` VARCHAR(191) NOT NULL,
    MODIFY `access_token` VARCHAR(191) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user_comment` DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user_in_group` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `group_id`);

-- AlterTable
ALTER TABLE `user_liked_comment` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `comment_id`);

-- AlterTable
ALTER TABLE `user_liked_content` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `content_id`);

-- AlterTable
ALTER TABLE `verification_requests` MODIFY `identifier` VARCHAR(191) NOT NULL,
    MODIFY `token` VARCHAR(191) NOT NULL,
    MODIFY `expires` DATETIME(3) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `email` VARCHAR(255),
    `email_verified` TIMESTAMP(6),
    `image` VARCHAR(255),
    `bio` VARCHAR(255),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `user.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `content` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_in_group` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_liked_comment` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_liked_content` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user1_blocked_user2` ADD FOREIGN KEY (`A`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user1_blocked_user2` ADD FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user1_follows_user2` ADD FOREIGN KEY (`A`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user1_follows_user2` ADD FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterIndex
ALTER TABLE `accounts` RENAME INDEX `provider_account_id` TO `providerAccountId`;

-- AlterIndex
ALTER TABLE `accounts` RENAME INDEX `provider_id` TO `providerId`;

-- AlterIndex
ALTER TABLE `accounts` RENAME INDEX `user_id` TO `userId`;
