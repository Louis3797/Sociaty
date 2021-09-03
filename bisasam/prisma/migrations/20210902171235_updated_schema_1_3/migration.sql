/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Hashtag.text_unique` ON `Hashtag`(`text`);
