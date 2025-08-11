-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('SUBSCRIBED', 'NOT_SUBSCRIBED', 'CANCELED');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'ADMIN', 'BETA');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'USER',
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'NOT_SUBSCRIBED';
