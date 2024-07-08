/*
  Warnings:

  - You are about to alter the column `poke_id` on the `have_poke` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `have_poke_id_key` ON `have_poke`;

-- AlterTable
ALTER TABLE `have_poke` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `poke_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `have_poke` ADD CONSTRAINT `have_poke_poke_id_fkey` FOREIGN KEY (`poke_id`) REFERENCES `poke_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
