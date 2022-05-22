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
exports.orderModel = exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const order_schema_1 = require("../schemas/order-schema");
const Order = (0, mongoose_1.model)('orders', order_schema_1.OrderSchema);
class OrderModel {
    findById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield Order.findOne({ _id: orderId });
            return order;
        });
    }
    findAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield Order.find({ userId });
            return orders;
        });
    }
    create(orderInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdNewOrder = yield Order.create(orderInfo);
            return createdNewOrder;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield Order.find({});
            return orders;
        });
    }
    update({ orderId, update }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: orderId };
            const option = { returnOriginal: false };
            const updatedOrder = yield Order.findOneAndUpdate(filter, update, option);
            return updatedOrder;
        });
    }
    deleteById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Order.deleteOne({ _id: orderId });
            return result;
        });
    }
}
exports.OrderModel = OrderModel;
const orderModel = new OrderModel();
exports.orderModel = orderModel;
