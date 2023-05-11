import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import validator from 'validator'

const prisma = new PrismaClient()

export async function getRecordingById(req: Request, res: Response) {
  console.log('Recordings - GET received - getRecordingById')
  try {
    const recordingId = req.params.recordingid;

    validateRecordingId(recordingId)

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

    if (!recording){
      return res.status(404).send({ message: 'Resource not found' })
    }

    if (!recording.published) {
      if (!req.body.user || recording.creator_uid !== req.body.user.uid) {
        return res.status(403).send({ message: 'Private' })
      }
    }
    return res.status(200).send(recording)

  } catch (err) {
    if (err instanceof InvalidRecordingError) {
      res.status(400).send({ message: err.message})
    } else {
      res.status(500).send({ message: 'Internal server error'})
    }
  }
}

export async function uploadRecording(req: Request, res: Response) {
  console.log('Recordings - POST received - uploadRecording')
  const {
    user,
    thumbnail_link,
    title,
    description,
    language,
    recording_link,
  } = req.body

  if (
    !title || typeof title !== 'string' ||
    !language || typeof language !== 'string' ||
    !recording_link || typeof recording_link !== 'string'
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
        full_link: `https://645d2dfc99772b16711cd6ea--gleaming-pastelito-554f17.netlify.app/player/${newRecording.recording_id}`,
        iframe_link: `<iframe src='https://645d2dfc99772b16711cd6ea--gleaming-pastelito-554f17.netlify.app/player/${newRecording.recording_id}?embed=true' width='1000' height='480' allowFullScreentitle='${newRecording.title}'/>`
      }
    })
    res.status(201).send(updatedNewRecording)
  } catch (err) {
    console.error(err);
    res.status(409).send({ message: 'Unable to create resource' })
  }
}

export async function updateRecording(req: Request, res: Response) {
  console.log('Recordings - PATCH received - updateRecording')
  const recordingId = req.params.recordingid

  validateRecordingId(recordingId)
  
  const dataToUpdate: Record<string, string | boolean> = {};
  
  const fieldsToUpdate: string[] = ['thumbnail_link', 'title', 'description', 'published', 'language', 'full_link', 'iframe_link']
  let invalidFields: string[] = [];
  fieldsToUpdate.forEach((field: string) => {
    if (req.body[field] !== undefined) {
      if (field !== 'published' && typeof req.body[field] !== 'string') {
        invalidFields.push(field)
      }
      if (field === 'published' && typeof req.body[field] !== 'boolean') {
        invalidFields.push(field)
      }
      dataToUpdate[field] = req.body[field]
    }
  })
  if (invalidFields.length > 0) {
    return res.status(400).send({ message: 'Type of field to update error'})
  }

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).send({ message: 'Error updating resource: no fields to update provided' })
  }

  const searchConditions = {
    recording_id: req.params.recordingid,
    creator_uid: req.body.user.id
  }
  try {
    const updatedRecording = await prisma.recording.update({
      where: searchConditions, 
      data: dataToUpdate
    })
    if (!updatedRecording) {
      return res.status(400).send({ message: 'Could not find recording to update'})
    };
    
    const allUserRecordings = await prisma.recording.findMany({
      where: {
        creator_uid: req.body.user.uid
      },
      orderBy: {
        created_at: 'desc'
      },
      include: {
        creator: {
          select: {
            picture: true
          }
        }
      }
    })
    if (!allUserRecordings) {
      return res.status(206).send({ message: 'Resource updated, but unable to return all resources for this user' })
    }
    res.status(200).send(allUserRecordings)
  } catch (err) {
    if (err instanceof InvalidRecordingError) {
      res.status(400).send({ message: err.message})
    } else {
      res.status(500).send({ message: 'Internal server error' })
    }
  }
}

export async function deleteRecording(req: Request, res: Response) {
  console.log('Recordings - DELETE received - deleteRecording')
  try {
    const recordingId = req.params.recordingid;
  
    validateRecordingId(recordingId);

    const recording = await prisma.recording.findUnique({
      where: {
        recording_id: recordingId
      }
    })

    if (!recording) {
      return res.status(404).send({ message: 'Resource not found'})
    }

    if (recording.creator_uid !== req.body.user.uid) {
      return res.status(403).send({ message: 'Not authorized'})
    }

    await prisma.recording.delete({
      where: {
        recording_id: recordingId
      }
    })
    res.status(204).send()
  } catch (err) {
    if (err instanceof InvalidRecordingError) {
      res.status(400).send({ message: err.message})
    } else {
      res.status(500).send({ message: 'Internal server error'})
    }
  }
}

function validateRecordingId(recordingId: string) {
  if (!validator.isUUID(recordingId)) {
    throw new InvalidRecordingError('Invalid recording id parameter')
  }
}

class InvalidRecordingError extends Error {}