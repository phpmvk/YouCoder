import * as dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import { PORT } from './config';
import router from './routes/router';

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(router)
  .use((_, res: Response) => {
    res.status(404).send('404: Not found') //<--- create a not found View for this
  })

app.listen(PORT, () => {
  console.log(`Server up and listening on port: ${PORT}`)
})