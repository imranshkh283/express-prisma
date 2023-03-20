import express from "express";

import userRoute from '../routes/users.route';
import profileRouter from '../routes/profile.route';
import postRouter from './post.route';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/users',
        route: userRoute
    }, 
    {
        path: '/profile',
        route: profileRouter 
    },
    {
        path: '/post',
        route: postRouter
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;