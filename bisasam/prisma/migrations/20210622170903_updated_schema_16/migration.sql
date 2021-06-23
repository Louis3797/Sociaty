-- AlterIndex
ALTER TABLE
  `user_liked_comment` RENAME INDEX `User_liked_comment.userId_comment_id_index` TO `LikedCommentIndex`;
-- AlterIndex
ALTER TABLE
  `user_liked_content` RENAME INDEX `User_liked_content.userId_content_id_index` TO `LikedContentIndex`;