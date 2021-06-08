-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `compound_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `provider_type` VARCHAR(191) NOT NULL,
    `provider_id` VARCHAR(191) NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191),
    `access_token` VARCHAR(191),
    `access_token_expires` DATETIME(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `accounts.compound_id_unique`(`compound_id`),
    INDEX `providerAccountId`(`provider_account_id`),
    INDEX `providerId`(`provider_id`),
    INDEX `userId`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content` (
    `content_id` INTEGER NOT NULL AUTO_INCREMENT,
    `content_text` TEXT,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `userId` INTEGER NOT NULL,
    `image_id` INTEGER,
    `imageImg_id` INTEGER,

    UNIQUE INDEX `content_image_id_unique`(`image_id`),
    PRIMARY KEY (`content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_chat` (
    `group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(30) NOT NULL,
    `group_description` VARCHAR(255),
    `admin_id` INTEGER NOT NULL,

    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `img_id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`img_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `message_id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `text_message` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,

    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `session_token` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `sessions.session_token_unique`(`session_token`),
    UNIQUE INDEX `sessions.access_token_unique`(`access_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `content_id` INTEGER NOT NULL,
    `comment_text` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_in_group` (
    `userId` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_liked_comment` (
    `userId` INTEGER NOT NULL,
    `comment_id` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_liked_content` (
    `userId` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `verification_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `verification_requests.token_unique`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_user1_blocked_user2` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_user1_blocked_user2_AB_unique`(`A`, `B`),
    INDEX `_user1_blocked_user2_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_user1_follows_user2` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_user1_follows_user2_AB_unique`(`A`, `B`),
    INDEX `_user1_follows_user2_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `content` ADD FOREIGN KEY (`image_id`) REFERENCES `image`(`img_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD FOREIGN KEY (`group_id`) REFERENCES `group_chat`(`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_in_group` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_in_group` ADD FOREIGN KEY (`group_id`) REFERENCES `group_chat`(`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_liked_comment` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_liked_comment` ADD FOREIGN KEY (`comment_id`) REFERENCES `user_comment`(`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_liked_content` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_liked_content` ADD FOREIGN KEY (`content_id`) REFERENCES `content`(`content_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user1_blocked_user2` ADD FOREIGN KEY (`A`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user1_blocked_user2` ADD FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user1_follows_user2` ADD FOREIGN KEY (`A`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user1_follows_user2` ADD FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
