/*
  Warnings:

  - Made the column `provider` on table `account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `account` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `provider` VARCHAR(191) NOT NULL,
    MODIFY `type` VARCHAR(191) NOT NULL;
