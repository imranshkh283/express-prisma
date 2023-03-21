import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { userService } from "../services";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const insertUser = async (req: Request, res: Response) => {
    const { email, name, password, role } = req.body;
    const count = await userService.getUserByEmail(email);
    if(count > 0){
        res.status(500).send('User Already Exists')
    } else {
        const user = await userService.createUser(email,name,password,role)
        res.status(200).send(user)
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUser();
        return res.status(200).json({
            data: users
        });
    } catch (e) {
        res.status(500).json({
            success: false,
        })
    }
}   

const updateUsers = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const updated = await userService.updateUserById(id, req.body)
        res.json(updated);
    } catch (error) {
        console.log(error)   
    }
}

const deleteUser = async (req: Request, res: Response) => {

    const id = Number(req.params);
    const del = await userService.deleteUserById(id)
    res.json({message : del})
}


export default {
    insertUser,
    getAllUsers,
    updateUsers,
    deleteUser,
}