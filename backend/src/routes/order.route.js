import { Router } from "express";
import {
    createAOrder,
    getOrderByEmail,
} from "../controllers/order.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", verifyJWT, createAOrder);

router.get("/email/:email", verifyJWT, getOrderByEmail);

export default router;
