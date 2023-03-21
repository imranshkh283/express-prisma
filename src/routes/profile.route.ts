import { Router } from "express";

import profileController from "../controller/profile.controller";

const router:Router = Router();

router.get('/',profileController.getAll);
router.post('/create', profileController.createProfile)
router.post('/update/:userId', profileController.updateProfile)
router.get('/getBio/:id',profileController.getBioByuserId)


export default router;