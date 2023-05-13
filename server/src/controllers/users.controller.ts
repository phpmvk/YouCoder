import { Request, Response } from 'express';
import { createCreatorAccount, deleteCreator, existingCreatorLogin } from '../models/users.model';

export async function creatorLoginController(req: Request, res: Response) {
  console.log('Users - POST received - creatorLogin');
  try {
    const userData = req.body.user

    const user = await existingCreatorLogin(userData)
    if (user) {
      return res.status(200).send({ user: user });
    }

    const newUser = await createCreatorAccount(userData)
    res.status(201).send({ user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
}

//this should be discarded if we dont implement this feature in the deployed version
export function updateCreatorController(req: Request, res: Response) {
  console.log('Users - PATCH received - updateCreator');
}

export async function deleteCreatorController(req: Request, res: Response) {
  console.log('Users - DELETE received - deleteCreator');
  try {
    await deleteCreator(req.body.user.uid);
    res.status(204).send();
  } catch (err) {
    return res.status(400).send({ error: 'User not found' });
  }
}
