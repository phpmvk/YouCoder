-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "userAgent" TEXT,
    "referer" TEXT,
    "country" TEXT,
    "city" TEXT,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "responseTime" DOUBLE PRECISION,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);
