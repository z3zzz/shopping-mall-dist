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
exports.orderMysqlModel = void 0;
const order_schema_1 = require("../schemas/order-schema");
class OrderMysqlModel {
    _excludeAddressAttribute(update) {
        if (!update.address) {
            return update;
        }
        const address = update.address;
        const postalCode = address.postalCode;
        const address1 = address.address1;
        const address2 = address.address2;
        const receiverName = address.receiverName;
        const receiverPhoneNumber = address.receiverPhoneNumber;
        delete update.address;
        return Object.assign(Object.assign({}, update), { postalCode,
            address1,
            address2,
            receiverName,
            receiverPhoneNumber });
    }
    _includeAddressAttribute(order) {
        if (!order) {
            return null;
        }
        const orderData = order.get();
        const address = {
            postalCode: orderData.postalCode,
            address1: orderData.address1,
            address2: orderData.address2,
            receiverName: orderData.receiverName,
            receiverPhoneNumber: orderData.receiverPhoneNumber,
        };
        return Object.assign(Object.assign({}, orderData), { address });
    }
    findById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_schema_1.Order.findOne({ where: { _id: orderId } });
            return this._includeAddressAttribute(order);
        });
    }
    findAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_schema_1.Order.findAll({ where: { userId } });
            const ordersWithAddressAttribute = [];
            for (const order of orders) {
                ordersWithAddressAttribute.push(this._includeAddressAttribute(order));
            }
            return ordersWithAddressAttribute;
        });
    }
    create(orderInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderInfoWithoutAddressAttribute = Object.assign(Object.assign({}, orderInfo), { postalCode: orderInfo.address.postalCode, address1: orderInfo.address.address1, address2: orderInfo.address.address2, receiverName: orderInfo.address.receiverName, receiverPhoneNumber: orderInfo.address.receiverPhoneNumber });
            delete orderInfoWithoutAddressAttribute.address;
            const createdNewOrder = yield order_schema_1.Order.create(orderInfoWithoutAddressAttribute);
            return this._includeAddressAttribute(createdNewOrder);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_schema_1.Order.findAll();
            const ordersWithAddressAttribute = [];
            for (const order of orders) {
                ordersWithAddressAttribute.push(this._includeAddressAttribute(order));
            }
            return ordersWithAddressAttribute;
        });
    }
    update({ orderId, update }) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { _id: orderId };
            yield order_schema_1.Order.update(this._excludeAddressAttribute(update), { where });
            const updatedOrder = yield order_schema_1.Order.findOne({ where });
            return this._includeAddressAttribute(updatedOrder);
        });
    }
    deleteById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield order_schema_1.Order.destroy({ where: { _id: orderId } });
            return { deletedCount };
        });
    }
}
const orderMysqlModel = new OrderMysqlModel();
exports.orderMysqlModel = orderMysqlModel;
