import { Role, PrismaClient, Prisma,User,Profile } from '@prisma/client';
const prisma = new PrismaClient()

const insertProfile = async (userId:number, updateData:string) => {
    return await prisma.profile.create({
        data : {
            bio : String(updateData),
            userId : Number(userId),
        }
    })
}

const getAllBio = async() => {
    return await prisma.profile.findMany();
}

const getUserById = async (userId:number) => {
    return await prisma.user.count({
        where:{id:userId}
    })
}

const updateProfile = async (userId:number, updateData:string) => {

    return await prisma.profile.update({
        where:{userId:userId},
        data:{ bio:updateData},
        select:{userId:true, bio:true}
    })
}

export default {
    insertProfile,
    getAllBio,
    getUserById,
    updateProfile,
}