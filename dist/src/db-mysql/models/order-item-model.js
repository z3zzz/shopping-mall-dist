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
exports.orderItemMysqlModel = void 0;
const order_item_schema_1 = require("../schemas/order-item-schema");
class OrderItemMysqlModel {
    findById(orderItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItem = yield order_item_schema_1.OrderItem.findOne({ where: { _id: orderItemId } });
            return orderItem;
        });
    }
    findAllByOrderId(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield order_item_schema_1.OrderItem.findAll({ where: { orderId } });
            return orderItems;
        });
    }
    findAllByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield order_item_schema_1.OrderItem.findAll({ where: { productId } });
            return orderItems;
        });
    }
    create(orderItemInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdNewOrderItem = yield order_item_schema_1.OrderItem.create(orderItemInfo);
            return createdNewOrderItem;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield order_item_schema_1.OrderItem.findAll();
            return orderItems;
        });
    }
    update({ orderItemId, update, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { _id: orderItemId };
            yield order_item_schema_1.OrderItem.update(update, { where });
            const updatedOrderItem = yield order_item_schema_1.OrderItem.findOne({ where });
            return updatedOrderItem;
        });
    }
    deleteById(orderItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield order_item_schema_1.OrderItem.destroy({
                where: { _id: orderItemId },
            });
            return { deletedCount };
        });
    }
}
const orderItemMysqlModel = new OrderItemMysqlModel();
exports.orderItemMysqlModel = orderItemMysqlModel;
