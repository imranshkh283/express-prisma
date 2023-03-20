import { Router } from "express";

import postController from "../controller/post.controller";

const router:Router = Router();

router.post('/create', postController.createPost);
router.post('/publish', postController.publistPost);
router.post('/update/:id', postController.editPost);

export default router;