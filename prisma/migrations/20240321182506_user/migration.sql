/*
  Warnings:

  - Added the required column `user` to the `billingdata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `billingdata` ADD COLUMN `user` VARCHAR(191) NOT NULL;
