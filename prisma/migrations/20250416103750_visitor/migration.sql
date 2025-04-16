/*
  Warnings:

  - Added the required column `date` to the `visitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visitor" ADD COLUMN     "date" TEXT NOT NULL;
