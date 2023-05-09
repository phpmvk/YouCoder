import { Request, Response } from "express";
import { sendCode } from '../services/Judge0/judge0'
import { default as judgeZeroLanguages } from '../services/Judge0/languages'

export async function getConsoleOutput(req: Request, res: Response) {
  console.log('Code-Execution POST received - getConsoleOutput')
  try {
    const {language_id, source_code} = req.body
    if (!language_id || !source_code) {  
      return res.status(400).send({ error: 'Bad request' })
    }
    if (judgeZeroLanguages.filter(el => el.id === +language_id).length < 1) {
      return res.status(400).send({ error: 'Bad request, language_id is not accepted' })
    }
    
    const codeToBeExecuted = req.body
    const codeExecutionOutput = await sendCode(codeToBeExecuted)
    res.status(200).send({stdout: codeExecutionOutput})

  } catch (err) {
    console.error(err)
    res.status(500).send({error: '500: Internal server error'})
  }
}