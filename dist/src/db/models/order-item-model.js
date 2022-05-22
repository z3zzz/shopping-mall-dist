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
exports.orderItemModel = exports.OrderItemModel = void 0;
const mongoose_1 = require("mongoose");
const order_item_schema_1 = require("../schemas/order-item-schema");
const OrderItem = (0, mongoose_1.model)('order-items', order_item_schema_1.OrderItemSchema);
class OrderItemModel {
    findById(orderItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItem = yield OrderItem.findOne({ _id: orderItemId });
            return orderItem;
        });
    }
    findAllByOrderId(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield OrderItem.find({ orderId });
            return orderItems;
        });
    }
    findAllByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield OrderItem.find({ productId });
            return orderItems;
        });
    }
    create(orderItemInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdNewOrderItem = yield OrderItem.create(orderItemInfo);
            return createdNewOrderItem;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield OrderItem.find({});
            return orderItems;
        });
    }
    update({ orderItemId, update }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: orderItemId };
            const option = { returnOriginal: false };
            const updatedOrderItem = yield OrderItem.findOneAndUpdate(filter, update, option);
            return updatedOrderItem;
        });
    }
    deleteById(orderItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield OrderItem.deleteOne({ _id: orderItemId });
            return result;
        });
    }
}
exports.OrderItemModel = OrderItemModel;
const orderItemModel = new OrderItemModel();
exports.orderItemModel = orderItemModel;
