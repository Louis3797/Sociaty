/*
  Warnings:

  - You are about to drop the column `gif_id` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `gif_id` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `gif_id` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `gif_id`,
    ADD COLUMN `gif_url` VARCHAR(191);

-- AlterTable
ALTER TABLE `content` DROP COLUMN `gif_id`,
    ADD COLUMN `gif_url` VARCHAR(191);

-- AlterTable
ALTER TABLE `message` DROP COLUMN `gif_id`,
    ADD COLUMN `gif_url` VARCHAR(191);
