import { Router } from "express";
/// import { UserController } from "../controller";
import usersController from "../controller/users.controller";

const router:Router = Router();

router.get('/', usersController.getAllUsers);
router.post('/create', usersController.insertUser);
router.post('/update/:id', usersController.updateUsers);
router.post('/delete/:id', usersController.deleteUser);

router.post('/login', usersController.login);
export default router;
