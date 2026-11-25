CREATE TABLE "User" (
  "id" TEXT NOT NULL PRIMARY KEY, "email" TEXT NOT NULL, "name" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL, "role" TEXT NOT NULL DEFAULT 'USER' CHECK ("role" IN ('USER','ADMIN')),
  "isActive" BOOLEAN NOT NULL DEFAULT true, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "Session" (
  "id" TEXT NOT NULL PRIMARY KEY, "userId" TEXT NOT NULL, "tokenHash" TEXT NOT NULL,
  "expiresAt" DATETIME NOT NULL, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");
CREATE TABLE "Resource" (
  "id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "type" TEXT NOT NULL CHECK ("type" IN ('ROOM','EQUIPMENT')),
  "description" TEXT NOT NULL DEFAULT '', "location" TEXT, "capacity" INTEGER CHECK ("capacity" IS NULL OR "capacity" > 0),
  "requiresApproval" BOOLEAN NOT NULL DEFAULT false, "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL
);
CREATE INDEX "Resource_type_isActive_idx" ON "Resource"("type","isActive");
CREATE TABLE "Booking" (
  "id" TEXT NOT NULL PRIMARY KEY, "resourceId" TEXT NOT NULL, "requesterId" TEXT NOT NULL,
  "startAt" DATETIME NOT NULL, "endAt" DATETIME NOT NULL, "purpose" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING' CHECK ("status" IN ('PENDING','APPROVED','REJECTED','CANCELLED','COMPLETED')),
  "reviewedById" TEXT, "reviewedAt" DATETIME, "reviewNote" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "Booking_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Booking_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Booking_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Booking_valid_interval_check" CHECK ("startAt" < "endAt")
);
CREATE INDEX "Booking_resourceId_startAt_endAt_idx" ON "Booking"("resourceId","startAt","endAt");
CREATE INDEX "Booking_requesterId_startAt_idx" ON "Booking"("requesterId","startAt");
CREATE INDEX "Booking_status_startAt_idx" ON "Booking"("status","startAt");
CREATE TRIGGER "Booking_no_overlap_insert" BEFORE INSERT ON "Booking"
WHEN NEW."status" IN ('PENDING','APPROVED','COMPLETED') BEGIN
  SELECT RAISE(ABORT,'RESOURCE_TIME_CONFLICT') WHERE EXISTS (
    SELECT 1 FROM "Booking" AS existing WHERE existing."resourceId"=NEW."resourceId"
    AND existing."status" IN ('PENDING','APPROVED','COMPLETED')
    AND NEW."startAt"<existing."endAt" AND NEW."endAt">existing."startAt"
  );
END;
CREATE TRIGGER "Booking_no_overlap_update" BEFORE UPDATE OF "resourceId","startAt","endAt","status" ON "Booking"
WHEN NEW."status" IN ('PENDING','APPROVED','COMPLETED') BEGIN
  SELECT RAISE(ABORT,'RESOURCE_TIME_CONFLICT') WHERE EXISTS (
    SELECT 1 FROM "Booking" AS existing WHERE existing."id"<>NEW."id" AND existing."resourceId"=NEW."resourceId"
    AND existing."status" IN ('PENDING','APPROVED','COMPLETED')
    AND NEW."startAt"<existing."endAt" AND NEW."endAt">existing."startAt"
  );
END;
