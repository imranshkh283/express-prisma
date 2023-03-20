import { Router } from "express";

import postController from "../controller/post.controller";

const router:Router = Router();

router.post('/create', postController.createPost);

export default router;