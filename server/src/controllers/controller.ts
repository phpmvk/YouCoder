import { Request, Response } from "express";
import { sendCode } from '../services/Judge0/judge0'
import { CodeToExecute } from "../types/types";

export async function getConsoleOutput(req: Request, res: Response) {
  console.log('POST received - getConsoleOutput')
  try {
    const codeToBeExecuted: CodeToExecute = req.body
    const test = await sendCode(codeToBeExecuted)
    res.status(200).send(test)


  } catch (err) {
    console.error(err)
    res.status(505).send({error: '505: Internal server error'})
  }


}

export function uploadRecording(req: Request, res: Response) {
  console.log('POST received - uploadRecording')
}

export function addNewCreator(req: Request, res: Response) {
  console.log('POST received - addNewCreator')
}