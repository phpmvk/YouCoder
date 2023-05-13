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
          picture: true
        }
      }
    }
  })
  return recording
}

export async function findUser(user: FirebaseUser): Promise<Creator | null>{
  const storedUser = await prisma.creator.findUnique({
    where: {
      uid: user.uid
    }
  })
  return storedUser
}

export async function fetchAllUserRecordings(uid: string): Promise<Recording[] | null>{
  const allUserRecordings = await prisma.recording.findMany({
    where: {
      creator_uid: uid
    },
    orderBy: {
      created_at: 'desc'
    }
  })
  return allUserRecordings
}

export async function updateRecording(recordingId: string , dataToUpdate: Record<string, string | boolean>) {
  const updatedRecording = await prisma.recording.update({
    where: {
      recording_id: recordingId
    }, 
    data: dataToUpdate
  })
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
  } = frontendRecording

  const random36CharStringId = randomBytes(18).toString('hex');

  const existingRecording = await prisma.recording.findUnique({
    where: {
      recording_id: random36CharStringId
    }
  })

  if (existingRecording) {
    return createNewRecording(frontendRecording);
  };

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
      created_at: (new Date(Date.now())).toString()
    },
    include: {
      creator: {
        select: {
          picture: true
        }
      }
    }
  })

  const updatedNewRecording = await prisma.recording.update({
    where: {
      recording_id: newRecording.recording_id
    },
    data: {
      full_link: `https://youcoder.io/player/${newRecording.recording_id}`,
      iframe_link: `<iframe src='https://youcoder.io/player/${newRecording.recording_id}?embed=true' width='1000' height='480' allowFullScreentitle='${newRecording.title}'/>`
    }
  })

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
