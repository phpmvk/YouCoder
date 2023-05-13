import { PrismaClient } from '@prisma/client';
import { FirebaseUser } from '../types/types';
const prisma = new PrismaClient();

export async function existingCreatorLogin(userData: FirebaseUser){
  const user = await prisma.creator.findUnique({
    where: {
      uid: userData.uid,
    },
    include: {
      recordings: {
        include: {
          creator: {
            select: {
              picture: true
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      }
    }
  });
  return user
};

export async function createCreatorAccount(userData: FirebaseUser){
  const newUser = await prisma.creator.create({
    data: {
      uid: userData.uid,
      display_name: userData.name,
      email: userData.email!,
      picture: userData.picture,
      join_date: new Date(Date.now()),
    },
    include: {
      recordings: true
    }
  });
  return newUser;
}

export async function deleteCreator(userId: string){
  const deletedCreator = await prisma.creator.delete({
    where: {
      uid: userId,
    },
  })
  return deletedCreator
}