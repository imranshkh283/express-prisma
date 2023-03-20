import { User,Role, Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const createUser = async (
    email: string,
    name: string,
    password:string,
):Promise<User> => {
    return await prisma.user.create({
        data:{
            email,
            name,
            password
        }
    })
}


export default {
    createUser,
};