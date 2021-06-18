/*
  Warnings:

  - You are about to drop the column `type` on the `content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `gif_id` VARCHAR(191);

-- AlterTable
ALTER TABLE `content` DROP COLUMN `type`,
    ADD COLUMN `gif_id` VARCHAR(191);

-- AlterTable
ALTER TABLE `message` ADD COLUMN `gif_id` VARCHAR(191);

-- CreateTable
CREATE TABLE `Hashtag` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentOnHashtag` (
    `hashtagId` VARCHAR(191) NOT NULL,
    `commentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`hashtagId`, `commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentOnHashtag` (
    `hashtagId` VARCHAR(191) NOT NULL,
    `contentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`hashtagId`, `contentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommentOnHashtag` ADD FOREIGN KEY (`hashtagId`) REFERENCES `Hashtag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentOnHashtag` ADD FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentOnHashtag` ADD FOREIGN KEY (`hashtagId`) REFERENCES `Hashtag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentOnHashtag` ADD FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
