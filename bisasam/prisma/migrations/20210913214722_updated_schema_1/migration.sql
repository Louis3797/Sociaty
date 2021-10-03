-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `account_ibfk_1`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_ibfk_2`;

-- DropForeignKey
ALTER TABLE `commentonhashtag` DROP FOREIGN KEY `commentonhashtag_ibfk_2`;

-- DropForeignKey
ALTER TABLE `commentonhashtag` DROP FOREIGN KEY `commentonhashtag_ibfk_3`;

-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `content_ibfk_1`;

-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `content_ibfk_2`;

-- DropForeignKey
ALTER TABLE `contentonhashtag` DROP FOREIGN KEY `contentonhashtag_ibfk_2`;

-- DropForeignKey
ALTER TABLE `contentonhashtag` DROP FOREIGN KEY `contentonhashtag_ibfk_3`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_ibfk_2`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_ibfk_3`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_ibfk_1`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_in_group` DROP FOREIGN KEY `user_in_group_ibfk_2`;

-- DropForeignKey
ALTER TABLE `user_in_group` DROP FOREIGN KEY `user_in_group_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_liked_comment` DROP FOREIGN KEY `user_liked_comment_ibfk_2`;

-- DropForeignKey
ALTER TABLE `user_liked_comment` DROP FOREIGN KEY `user_liked_comment_ibfk_3`;

-- DropForeignKey
ALTER TABLE `user_liked_content` DROP FOREIGN KEY `user_liked_content_ibfk_2`;

-- DropForeignKey
ALTER TABLE `user_liked_content` DROP FOREIGN KEY `user_liked_content_ibfk_3`;

-- DropForeignKey
ALTER TABLE `userfollows` DROP FOREIGN KEY `userfollows_ibfk_1`;

-- DropForeignKey
ALTER TABLE `userfollows` DROP FOREIGN KEY `userfollows_ibfk_2`;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(191),
    MODIFY `email` VARCHAR(191),
    MODIFY `image` VARCHAR(255);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentOnHashtag` ADD CONSTRAINT `CommentOnHashtag_hashtagText_fkey` FOREIGN KEY (`hashtagText`) REFERENCES `Hashtag`(`text`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentOnHashtag` ADD CONSTRAINT `CommentOnHashtag_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentOnHashtag` ADD CONSTRAINT `ContentOnHashtag_hashtagText_fkey` FOREIGN KEY (`hashtagText`) REFERENCES `Hashtag`(`text`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentOnHashtag` ADD CONSTRAINT `ContentOnHashtag_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_in_group` ADD CONSTRAINT `User_in_group_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_in_group` ADD CONSTRAINT `User_in_group_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_liked_comment` ADD CONSTRAINT `User_liked_comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_liked_comment` ADD CONSTRAINT `User_liked_comment_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_liked_content` ADD CONSTRAINT `User_liked_content_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_liked_content` ADD CONSTRAINT `User_liked_content_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFollows` ADD CONSTRAINT `UserFollows_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFollows` ADD CONSTRAINT `UserFollows_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `account` RENAME INDEX `Account.provider_providerAccountId_unique` TO `Account_provider_providerAccountId_key`;

-- RenameIndex
ALTER TABLE `hashtag` RENAME INDEX `Hashtag.text_unique` TO `Hashtag_text_key`;

-- RenameIndex
ALTER TABLE `session` RENAME INDEX `Session.sessionToken_unique` TO `Session_sessionToken_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User.displayName_unique` TO `User_displayName_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User.email_unique` TO `User_email_key`;

-- RenameIndex
ALTER TABLE `verificationtoken` RENAME INDEX `VerificationToken.identifier_token_unique` TO `VerificationToken_identifier_token_key`;

-- RenameIndex
ALTER TABLE `verificationtoken` RENAME INDEX `VerificationToken.token_unique` TO `VerificationToken_token_key`;
