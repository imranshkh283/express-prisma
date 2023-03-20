import httpStatus from 'http-status';
import { Role, PrismaClient } from '@prisma/client';
import { encryptPassword } from '../utils/encryption';

const prisma = new PrismaClient();

const createUser = async (
    email: string,
    name: string,
    password:string,
    role: string
) => {
    if(await getUserByEmail(email)){
        
    }
    return await prisma.user.create({
        data:{
            email,
            name,
            password : await encryptPassword(password),
            role: (role == '2' ? Role.USER : Role.ADMIN)
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