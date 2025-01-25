import { Router } from "express";
import {
    Register,
    Login,
    Logout,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(Register);

router.route("/login").post(Login);

router.route("/logout").post(verifyJWT, Logout);

export default router;
