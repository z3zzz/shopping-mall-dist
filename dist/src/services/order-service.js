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
exports.orderService = void 0;
const db_1 = require("../db");
const db_mysql_1 = require("../db-mysql");
class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    addOrder(orderInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            // db에 저장
            const createdNewOrder = yield this.orderModel.create(orderInfo);
            return createdNewOrder;
        });
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderModel.findAll();
            return orders;
        });
    }
    getOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderModel.findAllByUserId(userId);
            return orders;
        });
    }
    setOrder(orderId, toUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedOrder = yield this.orderModel.update({
                orderId,
                update: toUpdate,
            });
            return updatedOrder;
        });
    }
    getOrderData(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderModel.findById(orderId);
            // db에서 찾지 못한 경우, 에러 메시지 반환
            if (!order) {
                throw new Error('해당 id의 주문은 없습니다. 다시 한 번 확인해 주세요.');
            }
            return order;
        });
    }
    deleteOrderData(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield this.orderModel.deleteById(orderId);
            // 삭제에 실패한 경우, 에러 메시지 반환
            if (deletedCount === 0) {
                throw new Error(`${orderId} 주문의 삭제에 실패하였습니다`);
            }
            return { result: 'success' };
        });
    }
}
const usedDb = process.env.USED_DB;
let orderService;
exports.orderService = orderService;
if (usedDb === 'mongodb') {
    exports.orderService = orderService = new OrderService(db_1.orderModel);
}
else {
    //@ts-ignore
    exports.orderService = orderService = new OrderService(db_mysql_1.orderMysqlModel);
}
