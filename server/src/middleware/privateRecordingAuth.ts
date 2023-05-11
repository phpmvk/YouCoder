import { NextFunction, Request, Response } from "express";
import admin from "../services/Firebase";

export async function authenticateTokenForPrivateRecordingAccess (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      next()
    } else {
      if(authHeader.split(' ')[0] !== 'Bearer') {
        return res.status(401).send({ message: 'Invalid token' })
      }
  
      const token = authHeader.split(' ')[1];
      const validatedToken = await admin.auth().verifyIdToken(token)

      req.body.user = validatedToken
      next()
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: 'Internal server error'})
  }
}