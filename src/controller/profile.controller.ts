import { Request, Response, NextFunction, response } from "express";
import { Profile, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProfile = async (req : Request, res : Response, next : NextFunction) => {

    try {
        const {bio, userId} = req.body;

        const getUser = await prisma.profile.findUnique({
            where: {
                userId: Number(req.body.userId)
            },
            select: {
                userId: true,
                user:{
                    select: {
                        id:true
                    }
                }
            }
        })
        if (getUser?.userId != null) {
            checkUsers(userId, bio);
        } else {
            const pro = await prisma.profile.create({
                data : {
                    bio : String(bio),
                    userId : Number(userId),
                }
            })
            res.json({message : 'success', data : pro})
        }
    } catch (e) {
        console.log(e)
    }
}

const checkUsers = async (userId:number,bio: string) => {
    
    const existsId = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true
        }
    })
    if(existsId){
        return await prisma.profile.update({
            where: {
                userId: userId
            },
            data:{
                bio:bio
            }
        })
    }
}

const updateProfile = async (req : Request, res : Response, next : NextFunction) => {

    try {
        const {userId} = req.params
        const {bio} = req.body

        const update = await prisma.profile.update({
            where: {
                userId: Number(userId)
            },
            data : {
                bio : String(bio),
            }
        })
        res.json({messgae : 'update', data : update})
    } catch (e) {
        console.log(e)
    }
}

const getBioByuserId = async (req: Request, res: Response) => {

    const id = req.params.id;
    try {
        const data = await prisma.profile.findUnique({
            where: {
                userId: Number(id),
            },
            select: {
                bio:true,
                user: {
                    select:{
                        name:true,
                        email:true
                    }
                }
            }
        })
        return res.status(200).json({
            message: "Success",
            data
        });
    } catch (e) {
        res.json(e)
    }
}

const getAllBio = async (req:Request, res:Response) => {

    try {
        const getAll = await prisma.profile.findMany();
        const cnt = await prisma.profile.count()
        return res.status(200).json({
            message: "Success",
            count : cnt,
            getAll
        });
    } catch (e) {
        res.json(e)
    }
}

export default {
    createProfile,
    updateProfile,
    getBioByuserId,
    getAllBio
}