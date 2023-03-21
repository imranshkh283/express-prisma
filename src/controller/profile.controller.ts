import { Request, Response, NextFunction, response } from "express";
import { Profile, Prisma, PrismaClient } from "@prisma/client";
import { profileService, userService } from "../services";
const prisma = new PrismaClient();

const createProfile = async (req : Request, res : Response, next : NextFunction) => {

    try {
        const {bio, userId} = req.body;

        const getUser = await profileService.getUserById(userId)
        if (getUser > 0) {
            await userService.updateUserById(userId, bio);
        } else {
            const pro = await profileService.insertProfile(userId, bio)
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

const getAll = async (req:Request, res:Response) => {

    try {
        const getAll = await profileService.getAllBio();
        return res.status(200).json({
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
    getAll
}