-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "CleanupZone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "center" geography(Point,4326) NOT NULL,
    "radiusMeters" INTEGER NOT NULL,
    "country" VARCHAR(2) NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT,

    CONSTRAINT "CleanupZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantCheckIn" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "checkedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkedOutAt" TIMESTAMP(3),
    "lastLat" DOUBLE PRECISION,
    "lastLng" DOUBLE PRECISION,
    "lastSeenAt" TIMESTAMP(3),

    CONSTRAINT "ParticipantCheckIn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CleanupZone_country_region_idx" ON "CleanupZone"("country", "region");

-- CreateIndex
CREATE INDEX "CleanupZone_eventId_idx" ON "CleanupZone"("eventId");

-- CreateIndex
CREATE INDEX "ParticipantCheckIn_eventId_idx" ON "ParticipantCheckIn"("eventId");

-- CreateIndex
CREATE INDEX "ParticipantCheckIn_userId_idx" ON "ParticipantCheckIn"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantCheckIn_eventId_userId_key" ON "ParticipantCheckIn"("eventId", "userId");
