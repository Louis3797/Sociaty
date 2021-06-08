-- AddForeignKey
ALTER TABLE `user_comment` ADD FOREIGN KEY (`content_id`) REFERENCES `content`(`content_id`) ON DELETE CASCADE ON UPDATE CASCADE;
