-- CreateTable
CREATE TABLE "CreatorSocials" (
    "creator_uid" TEXT NOT NULL,
    "creator_socials_id" TEXT NOT NULL,
    "socials_platform" TEXT NOT NULL,
    "creator_social_link" TEXT NOT NULL,

    CONSTRAINT "CreatorSocials_pkey" PRIMARY KEY ("creator_socials_id")
);

-- AddForeignKey
ALTER TABLE "CreatorSocials" ADD CONSTRAINT "CreatorSocials_creator_uid_fkey" FOREIGN KEY ("creator_uid") REFERENCES "Creator"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
