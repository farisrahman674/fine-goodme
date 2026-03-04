/*
  Warnings:

  - You are about to drop the column `type` on the `Image` table. All the data in the column will be lost.
  - Added the required column `role` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImageRole" AS ENUM ('IMAGE_PRODUCT', 'IMAGE_DECOR');

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "type",
ADD COLUMN     "role" "ImageRole" NOT NULL;
