"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemSchema = void 0;
const mongoose_1 = require("mongoose");
const OrderItemSchema = new mongoose_1.Schema({
    orderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'orders',
        required: true,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'proucts',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default: '상품 준비중',
    },
}, {
    collection: 'order-items',
    timestamps: true,
});
exports.OrderItemSchema = OrderItemSchema;
