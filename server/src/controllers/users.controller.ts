import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function creatorLogin(req: Request, res: Response) {
  console.log('Users - POST received - creatorLogin');
  try {
    const user = await prisma.creator.findUnique({
      where: {
        uid: req.body.user.uid,
      },
    });
    if (user) {
      return res.status(200).send({ user: user });
    } else {
      const newUser = await prisma.creator.create({
        data: {
          uid: req.body.user.uid,
          display_name: req.body.user.name,
          email: req.body.user.email!,
          join_date: new Date(Date.now()),
        },
      });
      res.status(201).send({ user: newUser });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
}

//this should be discarded if we dont implement this feature in the deployed version
export function updateCreator(req: Request, res: Response) {
  console.log('Users - PATCH received - updateCreator');
}

export async function deleteCreator(req: Request, res: Response) {
  try {
    const { creatorid } = req.params;
    if (!creatorid) res.status(400).send({ error: 'Bad request' });

    try {
      await prisma.creator.delete({
        where: {
          uid: creatorid,
        },
      });
      return res.status(204).send();
    } catch (err) {
      return res.status(400).send({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
}
