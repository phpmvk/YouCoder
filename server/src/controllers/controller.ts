import { Request, Response } from "express";
import { sendCode } from '../services/Judge0/judge0'
import { CodeToExecute } from "../types/types";

export async function getConsoleOutput(req: Request, res: Response) {
  console.log('POST received - getConsoleOutput')
  try {
    //add condtionals here for error handling
    //add tests
    const codeToBeExecuted: CodeToExecute = req.body
    const codeExecutionOutput = await sendCode(codeToBeExecuted)
    res.status(200).send({stdout: codeExecutionOutput})
    //still need to add error handling here
  } catch (err) {
    console.error(err)
    res.status(500).send({error: '500: Internal server error'})
  }
}

export function uploadRecording(req: Request, res: Response) {
  console.log('POST received - uploadRecording')
}

export function addNewCreator(req: Request, res: Response) {
  console.log('POST received - addNewCreator')
}