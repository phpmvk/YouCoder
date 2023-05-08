-- CreateTable
CREATE TABLE "Creator" (
    "creator_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("creator_id")
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
    "recording_id" SERIAL NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "thumbnail_link" TEXT,
    "header" TEXT NOT NULL,
    "description" TEXT,
    "public" BOOLEAN NOT NULL,
    "language" TEXT NOT NULL,
    "recorder_actions" JSONB NOT NULL,
    "audio_link" TEXT NOT NULL,

    CONSTRAINT "Recording_pkey" PRIMARY KEY ("recording_id")
);

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Creator"("creator_id") ON DELETE RESTRICT ON UPDATE CASCADE;
