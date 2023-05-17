import { Request, Response } from 'express';
import { createCreatorAccount, deleteCreator, existingCreatorLogin, incrementLoginCount, updateField } from '../models/users.model';

export async function creatorLoginController(req: Request, res: Response) {
  console.log('Users - POST received - creatorLogin');
  try {
    const userData = req.body.user

    const user = await existingCreatorLogin(userData)
    if (user) {
      await incrementLoginCount(user.uid);
      const dataToUpdate = {
        last_login_datetime: new Date(Date.now())
      }
      await updateField(user.uid, dataToUpdate)
      return res.status(200).send({ user: user });
    }

    const newUser = await createCreatorAccount(userData)
    res.status(201).send({ user: newUser });
  } catch (err) {
    console.error('creatorLoginController error: ', err);
    res.status(500).send({ error: 'Internal server error' });
  }
}

export async function updateCreatorController(req: Request, res: Response) {
  console.log('Users - PATCH received - updateCreatorController');
  try {
    const { uid } = req.body.user;
    const dataToUpdate: Record<string, string> = {};
  
    const fieldsToUpdate: string[] = ['display_name', 'email', 'picture', 'socials']

    fieldsToUpdate.forEach((field: string) => {
      if (req.body[field] !== undefined) {
        dataToUpdate[field] = req.body[field]
      }
    });

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).send({ message: 'Error updating resource: no fields to update provided' })
    }

    const updatedUserProfile = await updateField(uid, dataToUpdate)
    return res.status(200).send({ user: updatedUserProfile });
  } catch (err) {
    console.error('updateCreatorController error: ', err);
    res.status(500).send({ message: 'Internal error updating user data' })
  }
}

export async function deleteCreatorController(req: Request, res: Response) {
  console.log('Users - DELETE received - deleteCreator');
  try {
    await deleteCreator(req.body.user.uid);
    res.status(204).send();
  } catch (err) {
    console.error('deleteCreatorController error: ', err);
    return res.status(400).send({ error: 'User not found' });
  }
}
