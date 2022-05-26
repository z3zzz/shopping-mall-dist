"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user_schema_1 = require("../schemas/user-schema");
const User = (0, mongoose_1.model)('users', user_schema_1.UserSchema);
class UserModel {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findOne({ email });
            return user;
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findOne({ _id: userId });
            return user;
        });
    }
    create(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdNewUser = yield User.create(userInfo);
            return createdNewUser;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User.find({});
            return users;
        });
    }
    update({ userId, update }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: userId };
            const option = { returnOriginal: false };
            const updatedUser = yield User.findOneAndUpdate(filter, update, option);
            return updatedUser;
        });
    }
    deleteById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield User.deleteOne({ _id: userId });
            return result;
        });
    }
}
exports.UserModel = UserModel;
const userModel = new UserModel();
exports.userModel = userModel;
