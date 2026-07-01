-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('BEFORE_PHOTO', 'AFTER_PHOTO', 'PROGRESS_PHOTO');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'PROCESSING', 'VERIFIED', 'REJECTED', 'MANUAL_REVIEW');

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "storageKey" TEXT NOT NULL,
    "fileSizeBytes" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verificationScore" DOUBLE PRECISION,
    "verificationNotes" TEXT,
    "pipelineVersion" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_storageKey_key" ON "MediaAsset"("storageKey");

-- CreateIndex
CREATE INDEX "MediaAsset_eventId_idx" ON "MediaAsset"("eventId");

-- CreateIndex
CREATE INDEX "MediaAsset_userId_idx" ON "MediaAsset"("userId");

-- CreateIndex
CREATE INDEX "MediaAsset_verificationStatus_idx" ON "MediaAsset"("verificationStatus");

-- CreateIndex
CREATE INDEX "MediaAsset_eventId_verificationStatus_idx" ON "MediaAsset"("eventId", "verificationStatus");
