/*
  Warnings:

  - You are about to alter the column `nama` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `email` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(25)`.
  - You are about to alter the column `status` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "nama" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(25);

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "status" SET DATA TYPE VARCHAR(10);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "email" VARCHAR(25) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
