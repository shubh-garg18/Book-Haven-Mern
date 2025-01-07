import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Book from "../models/book.model.js";
import { isValidObjectId } from "mongoose";

const postABook = asyncHandler(async (req, res) => {
    const {
        title,
        author,
        category,
        publicationDate,
        description,
        coverImage,
        oldPrice,
        newPrice,
    } = req.body;

    if (
        !title ||
        !author ||
        !category ||
        !publicationDate ||
        !description ||
        !coverImage ||
        !oldPrice ||
        !newPrice
    ) {
        throw new ApiError(404, "Please provide all required fields");
    }

    const book = await Book.create({
        title,
        author,
        category,
        publicationDate,
        description,
        coverImage,
        oldPrice,
        newPrice,
    });

    await book.save();

    if (!book) {
        throw new ApiError("Failed to create a book", 500);
    }

    return res
        .status(200)
        .json(new ApiResponse(201, "Book created successfully", book));
});

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find().sort({ createdAt: -1 });

    if (!books) {
        throw new ApiError(404, "Failed to fetch books");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, "Book fetched successfully", books));
});

const getSingleBook = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
        throw new ApiError(404, "Book not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, "Book fetched successfully", book));
});

const UpdateBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        title,
        author,
        category,
        publicationDate,
        description,
        coverImage,
        oldPrice,
        newPrice,
    } = req.body;

    if (!isValidObjectId(id)) {
        throw new ApiError(404, "Book not found");
    }

    const book = await Book.findByIdAndUpdate(
        id,
        {
            title,
            author,
            category,
            publicationDate,
            description,
            coverImage,
            oldPrice,
            newPrice,
        },
        {
            new: true,
        },
    );

    if (!book) {
        throw new ApiError(404, "Failed to update book");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, "Book updated successfully", book));
});

const deleteABook = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(404, "Book not found");
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
        throw new ApiError(404, "Failed to delete book");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, "Book deleted successfully", book));
});

export { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook };
