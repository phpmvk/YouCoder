-- CreateTable
CREATE TABLE "Creator" (
    "uid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL,
    "picture" TEXT NOT NULL,
    "login_count" INTEGER NOT NULL,
    "last_login_datetime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Recording" (
    "recording_id" TEXT NOT NULL,
    "creator_uid" TEXT NOT NULL,
    "thumbnail_link" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "language" TEXT NOT NULL,
    "recording_link" TEXT NOT NULL,
    "created_at_datetime" TIMESTAMP(3) NOT NULL,
    "created_at_timezone" TEXT NOT NULL,
    "time_since_creation" TEXT,
    "full_link" TEXT,
    "iframe_link" TEXT,
    "view_count" INTEGER NOT NULL,
    "like_count" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Recording_pkey" PRIMARY KEY ("recording_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL,
    "favorited_recordings" TEXT[],
    "creators_followed" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

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
    "status_code" INTEGER NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Creator_uid_key" ON "Creator"("uid");

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_creator_uid_fkey" FOREIGN KEY ("creator_uid") REFERENCES "Creator"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
