import { Server } from "http";
import app from './app';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

let server: Server;
prisma.$connect().then(() => {
    console.log('Connected to SQL Database')
    server = app.listen(3000, () => {
        console.log(`Listening to port 3000`);
    })
})