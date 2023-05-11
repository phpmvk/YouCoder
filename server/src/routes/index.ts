import { Router } from 'express'
import usersRouter from './users.router';
import codeExecutionRouter from './code-execution.router';
import recordingsRouter from './recordings.router';

const mainRouter = Router();

mainRouter.use('/code-execution', codeExecutionRouter)
mainRouter.use('/users', usersRouter)
mainRouter.use('/recording', recordingsRouter)

export default mainRouter
