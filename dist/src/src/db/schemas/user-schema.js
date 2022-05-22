"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    address: {
        type: new mongoose_1.Schema({
            postalCode: String,
            address1: String,
            address2: String,
        }, {
            _id: false,
        }),
        required: false,
    },
    role: {
        type: String,
        required: false,
        default: 'basic-user',
    },
    isOAuth: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    collection: 'users',
    timestamps: true,
});
exports.UserSchema = UserSchema;
