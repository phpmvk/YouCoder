-- CreateTable
CREATE TABLE "Creator" (
    "uid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("uid")
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
CREATE TABLE "Recording" (
    "recording_id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "creator_uid" TEXT NOT NULL,
    "thumbnail_link" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "language" TEXT NOT NULL,
    "recorder_actions" JSONB NOT NULL,
    "audio_link" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "full_link" TEXT,
    "iframe_link" TEXT,

    CONSTRAINT "Recording_pkey" PRIMARY KEY ("recording_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Creator_uid_key" ON "Creator"("uid");

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_creator_uid_fkey" FOREIGN KEY ("creator_uid") REFERENCES "Creator"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
