-- CreateTable
CREATE TABLE "visitor" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "records" TEXT NOT NULL DEFAULT '[]',

    CONSTRAINT "visitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitor_trackId_key" ON "visitor"("trackId");
