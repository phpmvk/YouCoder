import dotenv from 'dotenv'
import path from 'path'
const rootDir = path.join(__dirname, '..') //necessary since we have server and client in same repo. If we move server to another repo, we can eliminate this step
process.chdir(rootDir)
dotenv.config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import { PORT } from './config';
import mainRouter from './routes/index';
import { analyticsMiddleware } from './middleware/analytics';
import * as Sentry from "@sentry/node";

const app = express();

Sentry.init({
  dsn: "https://e43e03a9ce174847a5168cdb6ebfb2d6@o4505188814815232.ingest.sentry.io/4505188817240064"
});

app
  .use(cors({
    allowedHeaders: "*",
    origin: "*"
  }))
  .use(express.json())
  .use(analyticsMiddleware)
  .use(mainRouter)
  .use((_, res: Response) => {
    res.status(404).send({error: 'The endpoint requested does not exist'})
  })

app.listen(PORT, () => {
  console.log(`Server up and listening on port: ${PORT}`)
})

export { app };