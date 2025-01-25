import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }),
);

import bookRouter from "./routes/book.route.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/orders", orderRouter);

export default app;
