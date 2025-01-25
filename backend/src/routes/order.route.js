import { Router } from "express";
import {
    createAOrder,
    getOrderByEmail,
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createAOrder);

router.get("/email/:email", verifyJWT, getOrderByEmail);

export default router;
