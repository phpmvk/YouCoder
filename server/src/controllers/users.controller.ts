import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import firebase from "../services/Firebase";

export function creatorLogin(req: Request, res: Response) {
  console.log('Users - POST received - creatorLogin')
  //authenticate with Firebase Token
  const headerToken = req.headers.authorization
  if (!headerToken) {
    return res.status(401).send({ message: 'No token provided' });
  }
  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    return res.status(401).send({ message: 'Invalid token' })
  }
  
  //if exists, return user object
  //if not exists, create user and return user object
  const token = headerToken.split(' ')[1];

  firebase
    .auth()
    .verifyIdToken(token)
    .then((data) => {
      return res.status(200).send({user: data})
    })
    .catch((err) => res.status(403).send({ message: 'Could not authorize' + err }))

}

//update user
export function updateCreator(req: Request, res: Response) {
  console.log('Users - PATCH received - updateCreator')

}


//delete user
export function deleteCreator(req: Request, res: Response) {
  console.log('Users - DELETE received - deleteCreator')

}