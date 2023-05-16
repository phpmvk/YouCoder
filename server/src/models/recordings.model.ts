import { Creator, PrismaClient, Recording } from '@prisma/client'
import { randomBytes } from 'crypto';
import { FirebaseUser, FrontendRecording } from "../types/types";

const prisma = new PrismaClient()

export async function getRecordingById(recordingId: string): Promise<Recording | null> {
  const recording = await prisma.recording.findUnique({
    where: {
      recording_id: recordingId
    },
    include: {
      creator: {
        select: {
          picture: true,
          display_name: true,
        }
      }
    }
  });
  return recording
}

export async function incrementViewCount(recordingId: string): Promise<Recording | null> {
  const updatedRecording = await prisma.recording.update({
    where: {
      recording_id: recordingId
    },
    data: {
      view_count: { increment: 1}
    }
  });
  return updatedRecording
}

export async function incrementLikeCount(recordingId: string): Promise<Recording | null> {
  const updatedRecording = await prisma.recording.update({
    where: {
      recording_id: recordingId
    },
    data: {
      like_count: {increment: 1}
    }
  });
  return updatedRecording
}

export async function findUser(user: FirebaseUser): Promise<Creator | null>{
  const storedUser = await prisma.creator.findUnique({
    where: {
      uid: user.uid
    }
  });
  return storedUser
}

export async function fetchAllUserRecordings(uid: string): Promise<Recording[] | null>{
  const allUserRecordings = await prisma.recording.findMany({
    where: {
      creator_uid: uid
    },
    include: {
      creator: {
        select: {
          picture: true,
          display_name: true,
        }
      }
    },
    orderBy: {
      created_at_datetime: 'desc'
    }
  });
  return allUserRecordings
}

export async function fetchAllUserPublicRecordings(uid: string): Promise<Recording[] | null> {
  const publicRecordings = await prisma.recording.findMany({
    where: {
      creator_uid: uid,
      published: true
    },
    orderBy: {
      view_count: 'desc'
    },
    include: {
      creator: {
        select: {
          picture: true,
          display_name: true
        }
      }
    }
  });
  return publicRecordings;
};

export async function fetchAllPublicRecordings(): Promise<Recording[] | null> {
  const allPublicRecordings = await prisma.recording.findMany({
    where: {
      published: true
    },
    orderBy: {
      view_count: 'desc'
    },
    include: {
      creator: {
        select: {
          picture: true,
          display_name: true
        }
      }
    }
  });
  return allPublicRecordings;
};

export async function fetchPublicRecordingsBySearchQuery(searchQuery: string ): Promise<Recording[] | null> {
  const publicRecordings = await prisma.recording.findMany({
    where: {
      published: true,
      OR: [
        {title: { contains: searchQuery}},
        {description: { contains: searchQuery}},
        {language: { contains: searchQuery}}
      ]
    },
    orderBy: {
      view_count: 'desc'
    },
    include: {
      creator: {
        select: {
          picture: true,
          display_name: true
        }
      }
    }
  });
  return publicRecordings;
}

export async function updateRecording(recordingId: string , dataToUpdate: Record<string, string | boolean>) {
  if (dataToUpdate.title) {
    const exisitingRecording = await prisma.recording.findUnique({
      where: {
        recording_id: recordingId
      }
    });
    if (exisitingRecording) {
      const updatedRecording = await prisma.recording.update({
        where: {
          recording_id: recordingId
        },
        data: {
          ...dataToUpdate,
          iframe_link: exisitingRecording.iframe_link?.replace(
            /title='[^']*'/,
            `title='${dataToUpdate.title}'`
          )
        }
      });
      return updatedRecording
    }
  };
  
  const updatedRecording = await prisma.recording.update({
    where: {
      recording_id: recordingId
    }, 
    data: dataToUpdate
  });
  return updatedRecording
}

export async function createNewRecording(frontendRecording: FrontendRecording): Promise<Recording> {
  const {
    user,
    thumbnail_link,
    title,
    description,
    language,
    recording_link,
    duration,
    published,
  } = frontendRecording

  const random36CharStringId = randomBytes(18).toString('hex');

  const existingRecording = await prisma.recording.findUnique({
    where: {
      recording_id: random36CharStringId
    }
  });

  if (existingRecording) {
    return createNewRecording(frontendRecording);
  };

  const now = new Date();
  const createdDateTime = now.toISOString();
  const timezone = now.toUTCString();

  const newRecording = await prisma.recording.create({
    data: {
      creator: {
        connect: {
          uid: user.uid
        }
      },
      recording_id: random36CharStringId,
      thumbnail_link: thumbnail_link?thumbnail_link:'',
      title: title,
      description: description?description:'',
      language: language,
      recording_link: recording_link,
      created_at_datetime: createdDateTime,
      created_at_timezone: timezone,
      view_count: 0,
      like_count: 0,
      tags: [],
      duration: duration,
      published: published?published:false 
    },
    include: {
      creator: {
        select: {
          picture: true,
          display_name: true,
        }
      }
    }
  });

  const updatedNewRecording = await prisma.recording.update({
    where: {
      recording_id: newRecording.recording_id
    },
    data: {
      full_link: `https://youcoder.io/player/${newRecording.recording_id}`,
      iframe_link: `<iframe src='https://youcoder.io/player/${newRecording.recording_id}?embed=true&title=false&cover=true&theme=dark' width='900' height='480' allowFullScreen scrolling='no' title='${newRecording.title}'/>`
    }
  });
  return updatedNewRecording
}

export async function deleteRecording(recordingId: string): Promise<Recording>{
  const deletedRecording = await prisma.recording.delete({
    where: {
      recording_id: recordingId
    }
  })
  return deletedRecording
}
