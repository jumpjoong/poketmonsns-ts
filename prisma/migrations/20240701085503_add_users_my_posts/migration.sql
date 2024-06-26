-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pro_img` VARCHAR(191) NOT NULL DEFAULT '000',
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `credit` INTEGER NOT NULL DEFAULT 0,
    `rep` INTEGER NOT NULL DEFAULT 0,
    `badge_list` JSON NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poke_table` (
    `id` INTEGER NOT NULL,
    `en_name` VARCHAR(20) NULL,
    `ko_name` VARCHAR(20) NULL,
    `en_type` VARCHAR(100) NULL,
    `ko_type` VARCHAR(100) NULL,
    `card_url` VARCHAR(200) NULL,
    `motion_url` VARCHAR(200) NULL,
    `stats` VARCHAR(100) NULL,
    `credit` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `follow_table` (
    `id` INTEGER NOT NULL,
    `follow_list` VARCHAR(2000) NOT NULL,

    UNIQUE INDEX `follow_table_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `have_poke` (
    `id` INTEGER NOT NULL,
    `poke_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `have_poke_id_key`(`id`),
    INDEX `have_poke_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `like_count` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `posts_id_key`(`id`),
    INDEX `list_table_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorite_table` (
    `id` INTEGER NOT NULL,
    `favorite_list` VARCHAR(2000) NOT NULL,

    UNIQUE INDEX `favorite_table_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `have_poke` ADD CONSTRAINT `have_poke_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
