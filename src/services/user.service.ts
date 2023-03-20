import { User,Role, Prisma, PrismaClient } from '@prisma/client';
import { response } from 'express';
import { encryptPassword } from '../utils/encryption';

const prisma = new PrismaClient();

const createUser = async (
    email: string,
    name: string,
    password:string,
) => {
    return await prisma.user.create({
        data:{
            email,
            name,
            password : await encryptPassword(password),
        }
    })
}

const getUserByEmail = async (
    email: string
  ) => {
    return prisma.user.findUnique({
      where: { email },
      select: {
        email:true
      }
    })
  };

export default {
    createUser,
};