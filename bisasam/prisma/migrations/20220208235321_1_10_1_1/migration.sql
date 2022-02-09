-- DropIndex
DROP INDEX `User_displayName_idx` ON `user`;

-- DropIndex
DROP INDEX `User_name_idx` ON `user`;

-- CreateIndex
CREATE FULLTEXT INDEX `User_name_displayName_idx` ON `User`(`name`, `displayName`);
