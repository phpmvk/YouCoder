import dotenv from 'dotenv'
import path from 'path'
const rootDir = path.join(__dirname, '..') //necessary since we have server and client in same repo. If we move server to another repo, we can eliminate this step
process.chdir(rootDir)
dotenv.config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import { PORT } from './config';
import usersRouter from './routes/users.router'
import codeExecutionRouter from './routes/code-execution.router'
import recordingsRouter from './routes/recordings.router'

const app = express();

app
  .use(cors({
    allowedHeaders: "*",
    origin: "*"
  }))
  .use(express.json())
  .use(usersRouter)
  .use(recordingsRouter)
  .use(codeExecutionRouter)
  .use((_, res: Response) => {
    res.status(404).send({error: 'The endpoint requested does not exist'})
  })

app.listen(PORT, () => {
  console.log(`Server up and listening on port: ${PORT}`)
})

export { app };