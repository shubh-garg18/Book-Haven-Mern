import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Order from "../models/order.model.js";

const createAOrder = asyncHandler(async (req, res) => {
    const { user, productIds, totalPrice, address, phone } = req.body;

    if (!user || !productIds || !totalPrice || !address || !phone) {
        throw new ApiError(404, "Please provide all required fields");
    }

    const order = await Order.create({
        user,
        productIds,
        totalPrice,
        address,
        phone,
    });

    if (!order) {
        throw new ApiError(404, "Failed to create order");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, "Order created successfully", order));
});

const getOrderByEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(404, "Please provide email");
    }

    const orders = await Order.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userDetails",
            },
        },
        {
            $unwind: "$userDetails",
        },
        {
            $match: {
                "userDetails.email": email,
            },
        },
        {
            $sort: { createdAt: -1 },
        },
        {
            $project: {
                userDetails: 0,
            },
        },
    ]);

    if (!orders.length) {
        throw new ApiError(404, "Order not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, "Order fetched successfully", orders));
});

export { createAOrder, getOrderByEmail };
