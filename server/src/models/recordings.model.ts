import { PrismaClient } from '@prisma/client'
import { randomBytes } from 'crypto';
import { FirebaseUser, FrontendRecording, SavedRecording } from "../types/types";

const prisma = new PrismaClient()

export async function getRecordingById(recordingId: string, user: FirebaseUser) {
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



export async function createNewRecording(frontendRecording: FrontendRecording): Promise<SavedRecording> {
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


