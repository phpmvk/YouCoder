import { Request, Response } from "express";
import { sendCode } from '../services/Judge0/judge0'
import { CodeToExecute } from "../types/types";

export async function getConsoleOutput(req: Request, res: Response) {
  console.log('POST received - getConsoleOutput')
  try {
    // const codeToBeExecuted: CodeToExecute = req.body
    const reqBodySample: CodeToExecute = {
      language_id: "63",
      source_code: "function test() { console.log('let us see if this works') }; test();",
      stdin: ""
    }

    const codeExecutionOutput = await sendCode(reqBodySample)
    res.status(200).send(codeExecutionOutput)
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