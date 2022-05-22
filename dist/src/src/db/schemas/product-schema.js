"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    sellerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'categorys',
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    detailDescription: {
        type: String,
        required: true,
    },
    imageKey: {
        type: String,
        required: true,
    },
    inventory: {
        type: Number,
        min: 0,
        default: 10,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    searchKeywords: {
        type: [String],
        required: true,
    },
    isRecommended: {
        type: Boolean,
        default: false,
        required: false,
    },
    discountPercent: {
        type: Number,
        min: 0,
        max: 95,
        default: 0,
        required: false,
    },
    sku: {
        type: String,
        required: false,
    },
}, {
    collection: 'products',
    timestamps: true,
});
exports.ProductSchema = ProductSchema;
