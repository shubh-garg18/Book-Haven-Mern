import mongoose, { Schema } from "mongoose";

const orderSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true,
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        address: {
            city: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
            },
            country: {
                type: String,
            },
        },
        phone: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
