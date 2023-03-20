import { Request, Response, NextFunction } from "express";
import { User, PrismaClient } from "@prisma/client";
import { userService } from "../services";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const insertUser = async (req: Request, res: Response, next:NextFunction) => {

    const { email, name, password, role } = req.body;
    if(await getUserByEmail(req.body.email)){
        res.status(500).json('Email already taken')
    }
    const user = await prisma.user.create({
        data: {
            email: String(email),
            name: String(name),
            password: await bcrypt.hash(password, 8),
            role : (role == '1') ? 'USER' : 'ADMIN'
        }
    })

    return res.status(200).json({
        message:'user create',
        data: user
    })
}

const getUserByEmail = async (email:string) => {
    return await prisma.user.findUnique({
        where: {
            email:email,
        },
        select:{
            email:true,
        }
    })
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json({
            message: "Success",
            users
        });
    } catch (e) {
        res.status(500).json({
            success: false,
        })
    }
}   

const updateUsers = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const {name, email} = req.body;
        const updated = await prisma.user.update({
            where:{ 
                id: Number(id)
            },
            data: {
                name : String(name),
                email : String(email)
            }
        })
        res.json({ message: "update", data: updated });
    } catch (error) {
        console.log(error)   
    }
}

const deleteUser = async (req: Request, res: Response) => {

    const {id} = req.params;
    const user = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    });
    res.json({message : 'delete'})
}

const login = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body;
        const getPass = await prisma.user.findUnique({
            where: {
                email: String(email),
            },
            select: {
                email:true,
                password:true,
            },
        })
        if (getPass?.password) {
            const valid = await bcrypt.compare(password, getPass.password as string)
            if(!valid){
                return res.json('Incorrect email or password')
            } else {
                return res.json('Success')
            }
        }
    } catch (error) {
        
    }
}

export default {
    insertUser,
    getAllUsers,
    updateUsers,
    deleteUser,
    login,
}