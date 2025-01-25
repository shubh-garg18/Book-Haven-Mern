import { Router } from "express";
import {
    getAllBooks,
    getSingleBook,
    postABook,
    UpdateBook,
    deleteBook,
} from "../controllers/book.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create-book", verifyJWT, postABook);

router.get("/", getAllBooks);

router.get("/:id", getSingleBook);

router.patch("/edit/:id", verifyJWT, UpdateBook);

router.delete("/delete/:id", verifyJWT, deleteBook);

export default router;
