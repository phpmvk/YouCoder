import { Request, Response } from "express";


export function uploadRecording(req: Request, res: Response) {
  console.log('POST received - uploadRecording')
}

export function getRecordingById(req: Request, res: Response) {
  console.log('GET received - getRecordingById')
}