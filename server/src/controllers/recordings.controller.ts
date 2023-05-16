import { Request, Response } from "express";
import { getRecordingById, createNewRecording, findUser, fetchAllUserRecordings, updateRecording, deleteRecording, incrementViewCount, incrementLikeCount, fetchAllUserPublicRecordings, fetchPublicRecordingsBySearchQuery, fetchAllPublicRecordings } from "../models/recordings.model";
import moment from 'moment'

export async function getRecordingByIdController(req: Request, res: Response) {
  console.log('Recordings - GET received - getRecordingById')
  try {
    const recordingId = req.params.recordingid;
    const { user }  = req.body

    validateRecordingId(recordingId)

    const recording = await getRecordingById(recordingId)

    if (!recording){
      return res.status(404).send({ message: 'Resource not found' })
    }

    if (!recording.published) {
      if (!user || recording.creator_uid !== user.uid) {
        return res.status(403).send({ message: 'Private' })
      }
    }
    await incrementViewCount(recording.recording_id)
    recording.view_count++;
    recording.time_since_creation = moment(recording.created_at_datetime).fromNow()
    return res.status(200).send(recording)
  } catch (err) {
    if (err instanceof InvalidRecordingError) {
      console.error(err)
      res.status(400).send({ message: err.message})
    } else {
      console.error(err)
      res.status(500).send({ message: 'Internal server error'})
    }
  }
}

export async function incrementRecordingLikesController(req: Request, res: Response) {
  console.log('Recordings - POST received - incrementRecordingLikes')
  try {
    const { recording_id } = req.params
    const updatedResource = await incrementLikeCount(recording_id)
    if (!updatedResource) {
      return res.status(404).send({ message: 'Resource not found'})
    }
    res.status(200).send({ message: 'Resource updated' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Internal server error'})
  }
}

export async function getAllUserRecordingsController(req: Request, res: Response) {
  console.log('Recordings - GET received - getAllUserRecordings')
  try {
    const user = await findUser(req.body.user)
    if (!user) {
      return res.status(403).send({ message: 'User does not exist'})
    }
    const allUserRecordings = await fetchAllUserRecordings(user.uid)
    allUserRecordings?.forEach(recording => {
      recording.time_since_creation = moment(recording.created_at_datetime).fromNow()
    })
    res.status(200).send(allUserRecordings)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Internal server error'})
  }
}

export async function recordingsQueryController(req: Request, res: Response) {
  console.log('Recordings - GET received - recordingsQueryController')
  try {
    const { query, user } = req.query

    if (!query && !user) {
      return res.status(400).send({ message: 'No query params provided' })
    };

    if (user) {
      const uid = user.toString();
      try {
        const publicUserRecordings = await fetchAllUserPublicRecordings(uid);
        return res.status(200).send(publicUserRecordings)
      } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error searching for user with provided query parameters'})
      }
    }

    if (query) {
      const searchParams = query.toString();
      try {
        const publicSearchResults = await fetchPublicRecordingsBySearchQuery(searchParams);
        return res.status(200).send(publicSearchResults)
      } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error searching for resources with provided query parameters'})
      }
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error when searching with provided parameters: ' + req.query})
  }
}

export async function discoverPublicRecordingController(req: Request, res: Response) {
  console.log('Recordings - GET received - discoverPublicRecordingController')
  try {
    const allPublicRecordings = await fetchAllPublicRecordings();
    if (!allPublicRecordings) {
      return res.status(400).send({ message: 'No public recordings available' })
    }
    res.status(200).send(allPublicRecordings);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error fetching all public resources'})
  }
}

export async function uploadRecordingController(req: Request, res: Response) {
  console.log('Recordings - POST received - uploadRecording')
  try {
    const newRecording = await createNewRecording(req.body);
    newRecording.time_since_creation = moment(newRecording.created_at_datetime).fromNow()
    res.status(201).send(newRecording)
  } catch (err) {
    console.error(err);
    res.status(409).send({ message: 'Unable to create resource' })
  }
}

export async function updateRecordingController(req: Request, res: Response) {
  console.log('Recordings - PATCH received - updateRecording') 
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

  try {
    const recordingId = req.params.recordingid
    validateRecordingId(recordingId)

    const recordingToUpdate = await getRecordingById(recordingId)
    
    if (!recordingToUpdate) {
      return res.status(400).send({ message: 'Resource not found'})
    }

    if (recordingToUpdate.creator_uid !== req.body.user.uid) {
      return res.status(403).send({ message: 'Not authorized' })
    }

    const updatedRecording = await updateRecording(recordingId, dataToUpdate);

    updatedRecording.time_since_creation = moment(updatedRecording.created_at_datetime).fromNow()

    res.status(200).send(updatedRecording)
  } catch (err) {
    if (err instanceof InvalidRecordingError) {
      console.error(err)
      res.status(400).send({ message: err.message})
    } else {
      console.error(err)
      res.status(500).send({ message: 'Internal server error' })
    }
  }
}

export async function deleteRecordingController(req: Request, res: Response) {
  console.log('Recordings - DELETE received - deleteRecording')
  try {
    const recordingId = req.params.recordingid;
  
    validateRecordingId(recordingId);

    const recording = await getRecordingById(recordingId);

    if (!recording) {
      return res.status(404).send({ message: 'Resource not found'})
    }

    if (recording.creator_uid !== req.body.user.uid) {
      return res.status(403).send({ message: 'Not authorized'})
    }

    const deletedRecording = await deleteRecording(recordingId)
    if (!deletedRecording) {
      return res.status(500).send({ message: 'Internal server error'})
    }

    res.status(204).send()
  } catch (err) {
    if (err instanceof InvalidRecordingError) {
      console.error(err)
      res.status(400).send({ message: err.message})
    } else {
      console.error(err)
      res.status(500).send({ message: 'Internal server error'})
    }
  }
}


function validateRecordingId(recordingId: string) {
  if (!/^[a-f0-9]{36}$/i.test(recordingId)) {
    throw new InvalidRecordingError('Invalid recording id parameter')
  }
}

class InvalidRecordingError extends Error {}