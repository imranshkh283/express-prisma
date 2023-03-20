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
    } catch (e) {
        console.log(e)
    }
}

const publistPost = async (req: Request, res:Response) => {
    try {
        const { id, postId } = req.body

        const isAdmin = await prisma.user.findUnique({
            where:{
                id: Number(id),
            },
            select:{
                role:true
            }
        })
        if(isAdmin?.role == 'ADMIN'){
            return await prisma.post.update({
                where: { id: Number(postId) },
                data: {
                    published: true
                },
            }).then(() => {
                res.json({
                    message: `Post Id ${postId} Publish`,
                    id: postId
                })
            })
        } else {
            res.json('login with Admin for published this post')
        }
    } catch (e) {
        console.log(e)
    }
}

const editPost =  async (req: Request, res: Response) => {  
    
    try {
        const id = req.params.id
        const { title, content } = req.body;

        const editP = await prisma.post.update({
            where:{
                id: Number(id),
            },
            data:{
                title: String(title),
                content: String(content),   
                published: false,
            }
        })
        return res.status(200).json({
            message: 'Post has been update',
            data: editP
        })
    } catch (error) {
        
    }

}

export default {
    createPost,
    publistPost,
    editPost
}