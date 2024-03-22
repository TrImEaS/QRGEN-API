-- CreateTable
CREATE TABLE `BillingData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(191) NOT NULL,
    `client` INTEGER NOT NULL,
    `numberBill` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL,
    `checkDate` DATETIME(3) NOT NULL,
    `verificationNumber` INTEGER NOT NULL,
    `link` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
