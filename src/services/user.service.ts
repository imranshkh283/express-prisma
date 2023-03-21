import {updateUser} from '../interfaces/user';
import { Role, PrismaClient, Prisma,User } from '@prisma/client';
import { encryptPassword } from '../utils/encryption';

const prisma = new PrismaClient();

const createUser = async (
    email: string,
    name: string,
    password:string,
    role: string
) => {    
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
    return await prisma.user.count({
        where:{
            email:email
        }
    })
};

const updateUserById = async(
  userId:number, 
  updateBody:updateUser,
  ) => {
    const updateUser = await prisma.user.update({
      where:{id: userId},
      data:updateBody,
      select:{id:true,name:true,email:true}
    })
    return updateUser;
}

const getAllUser = async () => {
  return await prisma.user.findMany();
} 

const deleteUserById = async(
  id:number
) => {
  await prisma.user.delete({ where: { id: id } });
}

export default {
    createUser,
    getUserByEmail,
    getAllUser,
    updateUserById,
    deleteUserById,
};