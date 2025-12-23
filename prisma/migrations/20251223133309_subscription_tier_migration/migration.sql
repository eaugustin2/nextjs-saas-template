-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('BASIC', 'PREMIUM', 'PRO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'BASIC';
