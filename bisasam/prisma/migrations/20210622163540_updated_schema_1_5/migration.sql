-- CreateIndex
CREATE INDEX `User_liked_comment.userId_comment_id_index` ON `User_liked_comment`(`userId`, `comment_id`);

-- CreateIndex
CREATE INDEX `User_liked_content.userId_content_id_index` ON `User_liked_content`(`userId`, `content_id`);
