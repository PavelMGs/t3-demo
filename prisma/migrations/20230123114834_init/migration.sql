/*
  Warnings:

  - You are about to drop the `ColorSwatch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ColorSwatch" DROP CONSTRAINT "ColorSwatch_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "colorSwatch" JSONB[];

-- DropTable
DROP TABLE "ColorSwatch";
