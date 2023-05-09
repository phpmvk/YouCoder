import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import admin from "../services/Firebase";

export async function creatorLogin(req: Request, res: Response) {
  console.log('Users - POST received - creatorLogin')
  try {
    const headerToken = req.headers.authorization
  
    if (!headerToken) {
      return res.status(401).send({ message: 'No token provided' });
    }
    if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
      return res.status(401).send({ message: 'Invalid token' })
    }
    
    const token = headerToken.split(' ')[1];
    let validatedToken;
  
    try {
      validatedToken = await admin.auth().verifyIdToken(token)
    } catch (err) {
      return res.status(403).send({ message: 'Could not authorize' + err })
    }
  
    const user = await prisma.creator.findUnique({
      where: {
        uid: validatedToken.uid 
      }
    })
    if (user) {
      return res.status(200).send({user: user})
    } else {
      const newUser = await prisma.creator.create({
        data: {
          uid: validatedToken.uid,
          display_name: validatedToken.name,
          email: validatedToken.email!,
          join_date: new Date(Date.now()),
        }
      })
      res.status(201).send({ user: newUser})
    }

  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Internal server error'})
  }
}

//this should be discarded if we dont implement this feature in the deployed version
export function updateCreator(req: Request, res: Response) {
  console.log('Users - PATCH received - updateCreator')
}

export async function deleteCreator(req: Request, res: Response) {
  try {
    const { creatorid } = req.params;
    if (!creatorid) res.status(400).send({ error: 'Bad request' })

    try {
      await prisma.creator.delete({
        where: {
          uid: creatorid
        }
      })
      return res.status(204).send() // <--- make sure this URL works
    } catch (err) {
      return res.status(400).send({ error: 'User not found'})
    }
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Internal server error'})
  }
}