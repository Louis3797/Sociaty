-- CreateIndex
CREATE FULLTEXT INDEX `Group_group_name_idx` ON `Group`(`group_name`);

-- CreateIndex
CREATE FULLTEXT INDEX `Hashtag_text_idx` ON `Hashtag`(`text`);

-- CreateIndex
CREATE FULLTEXT INDEX `User_name_idx` ON `User`(`name`);

-- RenameIndex
ALTER TABLE `content` RENAME INDEX `Content_image_id_unique` TO `Content_image_id_key`;

-- RenameIndex
ALTER TABLE `message` RENAME INDEX `Message_image_id_unique` TO `Message_image_id_key`;
