import { Request, Response } from "express";


export function getConsoleOutput(req: Request, res: Response) {
  console.log('POST received - getConsoleOutput')
}

export function uploadRecording(req: Request, res: Response) {
  console.log('POST received - uploadRecording')
}

export function addNewCreator(req: Request, res: Response) {
  console.log('POST received - addNewCreator')
}