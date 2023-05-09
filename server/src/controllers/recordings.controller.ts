import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getRecordingById(req: Request, res: Response) {
  console.log('Recordings - GET received - getRecordingById')
  try {
    const recordingId = req.params.recordingid;

    const recording = await prisma.recording.findUnique({
      where: {
        recording_id: +recordingId
      }
    })

    if (!recording){
      return res.status(404).send({ message: 'Resource not found' })
    }

    res.send(200).send(recording)

  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Internal server error'})
  }
}

export async function uploadRecording(req: Request, res: Response) {
  console.log('Recordings - POST received - uploadRecording')
  const {
    user,
    thumbnail_link,
    title,
    description,
    published,
    language,
    recorder_actions,
    audio_link,
    created_at,
    full_link,
    iframe_link
  } = req.body

  if (
    !user.uid || typeof user.uid !== 'string' ||
    !thumbnail_link || typeof thumbnail_link !== 'string' ||
    !title || typeof title !== 'string' ||
    !description || typeof description !== 'string' ||
    !published || typeof published !== 'boolean' ||
    !language || typeof language !== 'string' ||
    !recorder_actions || typeof recorder_actions !== 'object' || typeof recorder_actions === null ||
    !audio_link || typeof audio_link !== 'string' ||
    !created_at || typeof created_at !== 'string' ||
    !full_link || typeof full_link !== 'string' ||
    !iframe_link || typeof iframe_link !== 'string'
  ) {
    return res.status(400).send({ message: 'Bad request' })
  }

  try {
    const newRecording = await prisma.recording.create({
      data: {
        creator: {
          connect: {
            uid: user.uid
          }
        },
        thumbnail_link: thumbnail_link,
        title: title,
        description: description,
        published: published,
        language: language,
        recorder_actions: recorder_actions,
        audio_link: audio_link,
        created_at: new Date(Date.now()),
        full_link: full_link,
        iframe_link: iframe_link,
      }
    })
    res.status(201).send(newRecording)
  } catch (err) {
    console.error(err);
    res.status(409).send({ message: 'Unable to create resource' })
  }
}

export async function updateRecording(req: Request, res: Response) {
  //patch route for update of any property, and reponse should be all the recordings
  console.log('Recordings - PATCH received - updateRecording')
  const recordingId = req.params.recordingid
  if (!recordingId) {
    return res.status(400).send({ message: 'Unable to update resource' })
  }
  
  const dataToUpdate: Record<string, string> = {};

  const fieldsToUpdate: string[] = ['recording_id', 'creator', 'creator_uid', 'thumbnail_link', 'title', 'description', 'published', 'language', 'recorder_actions', 'audio_link', 'created_at', 'full_link', 'iframe_link']
  fieldsToUpdate.forEach((field: string) => {
    if (req.body[field]) {
      dataToUpdate[field] = req.body[field]
    }
  })

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).send({ message: 'Error updating resource: no fields to update provided' })
  }

  try {
    const updatedRecording = await prisma.recording.update({
      where: {
        recording_id: +req.params.recordingid
      }, 
      data: dataToUpdate
    })
    if (!updatedRecording) {
      return res.status(400).send({ message: 'Could not find recording to update'})
    };
    
    const allUserRecordings = await prisma.recording.findMany({
      where: {
        creator_uid: req.body.user.uid
      }
    })
    if (!allUserRecordings) {
      return res.status(206).send({ message: 'Resource updated, but unable to return all resources for this user' })
    }
    res.status(200).send(allUserRecordings)
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error'})
  }
}