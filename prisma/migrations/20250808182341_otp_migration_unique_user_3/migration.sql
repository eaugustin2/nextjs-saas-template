/*
  Warnings:

  - Added the required column `email` to the `OTPToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTPToken" ADD COLUMN     "email" TEXT NOT NULL;
