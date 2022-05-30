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
exports.userMysqlModel = void 0;
const user_schema_1 = require("../schemas/user-schema");
class UserMysqlModel {
    _excludeAddressAttribute(update) {
        if (!update.address) {
            return update;
        }
        const address = update.address;
        const postalCode = address.postalCode;
        const address1 = address.address1;
        const address2 = address.address2;
        delete update.address;
        return Object.assign(Object.assign({}, update), { postalCode, address1, address2 });
    }
    _includeAddressAttribute(user) {
        if (!user) {
            return null;
        }
        const userData = user.get();
        const address = {
            postalCode: userData.postalCode,
            address1: userData.address1,
            address2: userData.address2,
        };
        return Object.assign(Object.assign({}, userData), { address });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.User.findOne({ where: { email } });
            return this._includeAddressAttribute(user);
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.User.findOne({ where: { _id: userId } });
            return this._includeAddressAttribute(user);
        });
    }
    create(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdNewUser = yield user_schema_1.User.create(userInfo);
            return this._includeAddressAttribute(createdNewUser);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_schema_1.User.findAll();
            return users;
        });
    }
    update({ userId, update }) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { _id: userId };
            yield user_schema_1.User.update(this._excludeAddressAttribute(update), { where });
            const updatedUser = yield user_schema_1.User.findOne({ where });
            return this._includeAddressAttribute(updatedUser);
        });
    }
    deleteById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield user_schema_1.User.destroy({ where: { _id: userId } });
            return { deletedCount };
        });
    }
}
const userMysqlModel = new UserMysqlModel();
exports.userMysqlModel = userMysqlModel;
