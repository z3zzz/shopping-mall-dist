"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    themeClass: {
        type: String,
        required: true,
    },
    imageKey: {
        type: String,
        required: true,
    },
}, {
    collection: 'categorys',
    timestamps: true,
});
exports.CategorySchema = CategorySchema;
