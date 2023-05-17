import { PrismaClient } from '@prisma/client';
import { FirebaseUser } from '../types/types';
import moment from 'moment';
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
              picture: true,
              display_name: true,
              uid: true,
              socials: true,
            }
          }
        },
        orderBy: {
          created_at_datetime: 'desc'
        }
      }
    }
  });
  user?.recordings.forEach(recording => {
    recording.time_since_creation = moment(recording.created_at_datetime).fromNow()
  })
  return user
};

export async function createCreatorAccount(userData: FirebaseUser){
  const newUser = await prisma.creator.create({
    data: {
      uid: userData.uid,
      display_name: userData.name || 'User',
      email: userData.email!,
      picture: userData.picture,
      join_date: new Date(Date.now()),
      login_count: 1,
      last_login_datetime: new Date(Date.now()),
      socials: {
        github: '#',
        twitter: '#',
        youtube: '#',
      },
    },
    include: {
      recordings: true
    }
  });
  return newUser;
}

export async function incrementLoginCount(uid: string) {
  const updatedCreator = prisma.creator.update({
    where: {
      uid: uid
    },
    data: {
      login_count: { increment: 1}
    }
  })
  return updatedCreator
}

export async function updateField(uid: string, dataToUpdate: Record<string, string | Date>) {
  const updatedCreator = prisma.creator.update({
    where: {
      uid: uid
    },
    data: dataToUpdate
  })
  return updatedCreator;
}

export async function deleteCreator(userId: string){
  const deletedCreator = await prisma.creator.delete({
    where: {
      uid: userId,
    },
  })
  return deletedCreator
}