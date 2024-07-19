-- DropForeignKey
ALTER TABLE `like_post` DROP FOREIGN KEY `like_post_post_id_fkey`;

-- AddForeignKey
ALTER TABLE `like_post` ADD CONSTRAINT `like_post_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE;