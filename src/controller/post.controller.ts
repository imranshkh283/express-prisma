import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPost = async (req:Request, res:Response) => {

    try {
        const {title, content, authorId} = req.body;
        const post = await prisma.post.create({
            data: {
                title: String(title),
                content: String(content),
                authorId: Number(authorId),
            }
        })
        return res.json({
            message: 'success',
            data:post
        })
    } catch (error) {
        
    }
}

export default {
    createPost
}