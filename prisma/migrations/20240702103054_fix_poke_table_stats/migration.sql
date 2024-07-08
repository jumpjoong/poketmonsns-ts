/*
  Warnings:

  - You are about to alter the column `stats` on the `poke_table` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Json`.

*/
-- AlterTable
ALTER TABLE `poke_table` MODIFY `stats` JSON NULL;
