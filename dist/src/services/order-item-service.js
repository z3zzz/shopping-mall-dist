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
exports.orderItemService = void 0;
const db_1 = require("../db");
const db_mysql_1 = require("../db-mysql");
class OrderItemService {
    constructor(orderItemModel) {
        this.orderItemModel = orderItemModel;
    }
    addItem(orderItemInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            // db에 저장
            const createdNewOrderItem = yield this.orderItemModel.create(orderItemInfo);
            return createdNewOrderItem;
        });
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield this.orderItemModel.findAll();
            return orderItems;
        });
    }
    getItemsByOrderId(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield this.orderItemModel.findAllByOrderId(orderId);
            return orderItems;
        });
    }
    getItemsByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield this.orderItemModel.findAllByProductId(productId);
            return orderItems;
        });
    }
    setItem(orderItemId, toUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedOrderItem = yield this.orderItemModel.update({
                orderItemId,
                update: toUpdate,
            });
            return updatedOrderItem;
        });
    }
    getItemData(orderItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItem = yield this.orderItemModel.findById(orderItemId);
            // db에서 찾지 못한 경우, 에러 메시지 반환
            if (!orderItem) {
                throw new Error('해당 id의 주문아이템은 없습니다. 다시 한 번 확인해 주세요.');
            }
            return orderItem;
        });
    }
    deleteItemData(orderItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield this.orderItemModel.deleteById(orderItemId);
            // 삭제에 실패한 경우, 에러 메시지 반환
            if (deletedCount === 0) {
                throw new Error(`${orderItemId} 주문의 삭제에 실패하였습니다`);
            }
            return { result: 'success' };
        });
    }
}
const usedDb = process.env.USED_DB;
let orderItemService;
exports.orderItemService = orderItemService;
if (usedDb === 'mongodb') {
    exports.orderItemService = orderItemService = new OrderItemService(db_1.orderItemModel);
}
else {
    //@ts-ignore
    exports.orderItemService = orderItemService = new OrderItemService(db_mysql_1.orderItemMysqlModel);
}
