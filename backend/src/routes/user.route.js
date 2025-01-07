import {Router} from 'express';
import { adminRegister, adminLogin } from '../controllers/user.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(adminRegister);

router.route('/login').post(adminLogin);

router.route('/logout').post(verifyJWT, logout);

export default router;
