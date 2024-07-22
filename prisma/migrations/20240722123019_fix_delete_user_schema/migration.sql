-- DropForeignKey
ALTER TABLE `follow_table` DROP FOREIGN KEY `follow_table_follower_id_fkey`;

-- DropForeignKey
ALTER TABLE `follow_table` DROP FOREIGN KEY `follow_table_following_id_fkey`;

-- DropForeignKey
ALTER TABLE `have_poke` DROP FOREIGN KEY `have_poke_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `like_post` DROP FOREIGN KEY `like_post_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `like_post` DROP FOREIGN KEY `like_post_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `follow_table` ADD CONSTRAINT `follow_table_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follow_table` ADD CONSTRAINT `follow_table_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `have_poke` ADD CONSTRAINT `have_poke_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like_post` ADD CONSTRAINT `like_post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like_post` ADD CONSTRAINT `like_post_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
