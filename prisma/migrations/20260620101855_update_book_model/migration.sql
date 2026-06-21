/*
  Warnings:

  - You are about to drop the column `salePrice` on the `book` table. All the data in the column will be lost.
  - Added the required column `mrp` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `salePrice`,
    ADD COLUMN `language` VARCHAR(191) NULL,
    ADD COLUMN `mrp` DOUBLE NOT NULL;
