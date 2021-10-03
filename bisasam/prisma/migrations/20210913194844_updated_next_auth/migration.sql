/*
  Warnings:

  - You are about to drop the column `accessToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accessTokenExpires` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerType` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accessToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the `verificationrequest` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `account_ibfk_1`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_ibfk_1`;

-- DropIndex
DROP INDEX `Account.providerId_providerAccountId_unique` ON `account`;

-- DropIndex
DROP INDEX `Session.accessToken_unique` ON `session`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `accessToken`,
    DROP COLUMN `accessTokenExpires`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `providerId`,
    DROP COLUMN `providerType`,
    DROP COLUMN `refreshToken`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `access_token` VARCHAR(191),
    ADD COLUMN `expires_at` INTEGER,
    ADD COLUMN `id_token` VARCHAR(191),
    ADD COLUMN `oauth_token` VARCHAR(191),
    ADD COLUMN `oauth_token_secret` VARCHAR(191),
    ADD COLUMN `provider` VARCHAR(191),
    ADD COLUMN `refresh_token` VARCHAR(191),
    ADD COLUMN `scope` VARCHAR(191),
    ADD COLUMN `session_state` VARCHAR(191),
    ADD COLUMN `token_type` VARCHAR(191),
    ADD COLUMN `type` VARCHAR(191);

-- AlterTable
ALTER TABLE `session` DROP COLUMN `accessToken`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- DropTable
DROP TABLE `verificationrequest`;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken.token_unique`(`token`),
    UNIQUE INDEX `VerificationToken.identifier_token_unique`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Account.provider_providerAccountId_unique` ON `Account`(`provider`, `providerAccountId`);

-- AddForeignKey
ALTER TABLE `Account` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
