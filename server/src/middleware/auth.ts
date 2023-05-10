import { NextFunction, Request, Response } from "express";
import admin from "../services/Firebase";

export async function authenticateToken (req: Request, res: Response, next: NextFunction){
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).send({ error: 'No token provided' })
    }
    if(authHeader && authHeader.split(' ')[0] !== 'Bearer') {
      return res.status(401).send({ message: 'Invalid token' })
    }

    const token = authHeader.split(' ')[1];
    const validatedToken = await admin.auth().verifyIdToken(token)

    if (!validatedToken.uid) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    req.body.user = validatedToken
    next();
  } catch (err) {
    console.error(err)
    return res.status(401).send({ message: 'Unauthorized' })
  }
}