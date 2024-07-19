/*
  Warnings:

  - You are about to drop the column `follow_list` on the `follow_table` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[follower_id,following_id]` on the table `follow_table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `follower_id` to the `follow_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `follow_table` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `follow_table_id_key` ON `follow_table`;

-- AlterTable
ALTER TABLE `follow_table` DROP COLUMN `follow_list`,
    ADD COLUMN `follower_id` INTEGER NOT NULL,
    ADD COLUMN `following_id` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE INDEX `follow_table_follower_id_fkey` ON `follow_table`(`follower_id`);

-- CreateIndex
CREATE INDEX `follow_table_following_id_fkey` ON `follow_table`(`following_id`);

-- CreateIndex
CREATE UNIQUE INDEX `follow_table_follower_id_following_id_key` ON `follow_table`(`follower_id`, `following_id`);

-- AddForeignKey
ALTER TABLE `follow_table` ADD CONSTRAINT `follow_table_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follow_table` ADD CONSTRAINT `follow_table_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
