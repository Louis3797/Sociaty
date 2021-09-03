/*
  Warnings:

  - The primary key for the `commentonhashtag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hashtagId` on the `commentonhashtag` table. All the data in the column will be lost.
  - The primary key for the `contentonhashtag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hashtagId` on the `contentonhashtag` table. All the data in the column will be lost.
  - The primary key for the `hashtag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `hashtag` table. All the data in the column will be lost.
  - Added the required column `hashtagText` to the `CommentOnHashtag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashtagText` to the `ContentOnHashtag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `commentonhashtag` DROP FOREIGN KEY `commentonhashtag_ibfk_3`;

-- DropForeignKey
ALTER TABLE `contentonhashtag` DROP FOREIGN KEY `contentonhashtag_ibfk_3`;

-- AlterTable
ALTER TABLE `commentonhashtag` DROP PRIMARY KEY,
    DROP COLUMN `hashtagId`,
    ADD COLUMN `hashtagText` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`hashtagText`, `commentId`);

-- AlterTable
ALTER TABLE `contentonhashtag` DROP PRIMARY KEY,
    DROP COLUMN `hashtagId`,
    ADD COLUMN `hashtagText` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`hashtagText`, `contentId`);

-- AlterTable
ALTER TABLE `hashtag` DROP PRIMARY KEY,
    DROP COLUMN `id`;

-- AddForeignKey
ALTER TABLE `CommentOnHashtag` ADD FOREIGN KEY (`hashtagText`) REFERENCES `Hashtag`(`text`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentOnHashtag` ADD FOREIGN KEY (`hashtagText`) REFERENCES `Hashtag`(`text`) ON DELETE RESTRICT ON UPDATE CASCADE;
