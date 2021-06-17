/*
  Warnings:

  - You are about to drop the column `email_verified` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image_id]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `content` ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `message` ADD COLUMN `image_id` VARCHAR(191),
    MODIFY `text_message` VARCHAR(255);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email_verified`,
    ADD COLUMN `emailVerified` DATETIME(3),
    MODIFY `displayName` VARCHAR(25),
    MODIFY `bannerUrl` VARCHAR(255),
    MODIFY `online` BOOLEAN DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Message_image_id_unique` ON `Message`(`image_id`);

-- AddForeignKey
ALTER TABLE `Message` ADD FOREIGN KEY (`image_id`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
