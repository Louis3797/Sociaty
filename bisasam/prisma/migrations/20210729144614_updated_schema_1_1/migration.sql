-- DropForeignKey
ALTER TABLE `commentonhashtag` DROP FOREIGN KEY `commentonhashtag_ibfk_1`;

-- DropForeignKey
ALTER TABLE `contentonhashtag` DROP FOREIGN KEY `contentonhashtag_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_liked_comment` DROP FOREIGN KEY `user_liked_comment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_liked_content` DROP FOREIGN KEY `user_liked_content_ibfk_1`;

-- AddForeignKey
ALTER TABLE `CommentOnHashtag` ADD FOREIGN KEY (`hashtagId`) REFERENCES `Hashtag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentOnHashtag` ADD FOREIGN KEY (`hashtagId`) REFERENCES `Hashtag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_liked_comment` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_liked_content` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
