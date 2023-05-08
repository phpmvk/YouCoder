import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export function uploadRecording(req: Request, res: Response) {
  console.log('Recordings - POST received - uploadRecording')
}

export function getRecordingById(req: Request, res: Response) {
  console.log('Recordings - GET received - getRecordingById')
}