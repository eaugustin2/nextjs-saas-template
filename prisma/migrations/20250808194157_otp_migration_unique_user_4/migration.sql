/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `OTPToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OTPToken_email_key" ON "OTPToken"("email");
