import { Router } from "express";
import {
    getAllBooks,
    getSingleBook,
    postABook,
} from "../controllers/book.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create-book", verifyJWT, postABook);

router.get("/", getAllBooks);

router.get("/:id", getSingleBook);

router.patch("/edit/:id", verifyJWT, UpdateBook);

router.delete("/delete/:id", verifyJWT, deleteBook);

export default router;
