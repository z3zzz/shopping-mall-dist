"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    summaryTitle: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    address: {
        type: new mongoose_1.Schema({
            postalCode: String,
            address1: String,
            address2: String,
            receiverName: String,
            receiverPhoneNumber: String,
        }, {
            _id: false,
        }),
        required: true,
    },
    request: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default: '상품 준비중',
    },
}, {
    collection: 'orders',
    timestamps: true,
});
exports.OrderSchema = OrderSchema;
