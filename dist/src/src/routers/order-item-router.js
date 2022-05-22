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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemRouter = void 0;
const is_1 = __importDefault(require("@sindresorhus/is"));
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const orderItemRouter = (0, express_1.Router)();
exports.orderItemRouter = orderItemRouter;
orderItemRouter.post('/orderitem', middlewares_1.loginRequired, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is_1.default.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }
        // req (request) 에서 데이터 가져오기
        const orderId = req.body.orderId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const totalPrice = req.body.totalPrice;
        // 위 데이터를 제품 db에 추가하기
        const newOrderItem = yield services_1.orderItemService.addItem({
            orderId,
            productId,
            quantity,
            totalPrice,
        });
        res.status(201).json(newOrderItem);
    }
    catch (error) {
        next(error);
    }
}));
// 전체 주문아이템 목록은 관리자만 조회 가능함
orderItemRouter.get('/orderitemlist/all', middlewares_1.adminOnly, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderItems = yield services_1.orderItemService.getItems();
            res.status(200).json(orderItems);
        }
        catch (error) {
            next(error);
        }
    });
});
// 특정 오더번호의 주문아이템 목록 조회
orderItemRouter.get('/orderitemlist/order/:orderId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderId = req.params.orderId;
            const orderItems = yield services_1.orderItemService.getItemsByOrderId(orderId);
            res.status(200).json(orderItems);
        }
        catch (error) {
            next(error);
        }
    });
});
// 특정 제품번호의 주문아이템 목록 조회
orderItemRouter.get('/orderitemlist/product/:productId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = req.params.productId;
            const orderItems = yield services_1.orderItemService.getItemsByProductId(productId);
            res.status(200).json(orderItems);
        }
        catch (error) {
            next(error);
        }
    });
});
orderItemRouter.get('/orderitems/:orderItemId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderItemId = req.params.orderItemId;
            const orderData = yield services_1.orderItemService.getItemData(orderItemId);
            res.status(200).json(orderData);
        }
        catch (error) {
            next(error);
        }
    });
});
orderItemRouter.patch('/orderitems/:orderItemId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
            if (is_1.default.emptyObject(req.body)) {
                throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
            }
            // req (request) 에서 데이터 가져오기
            const orderItemId = req.params.orderItemId;
            const quantity = req.body.quantity;
            const totalPrice = req.body.totalPrice;
            const status = req.body.status;
            // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
            // 보내주었다면, 업데이트용 객체에 삽입함.
            const toUpdate = Object.assign(Object.assign(Object.assign({}, (quantity && { quantity })), (totalPrice && { totalPrice })), (status && { status }));
            // 제품 정보를 업데이트함.
            const updatedOrderItem = yield services_1.orderItemService.setItem(orderItemId, toUpdate);
            res.status(200).json(updatedOrderItem);
        }
        catch (error) {
            next(error);
        }
    });
});
orderItemRouter.delete('/orderitems/:orderItemId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderItemId = req.params.orderItemId;
            const deleteResult = yield services_1.orderItemService.deleteItemData(orderItemId);
            res.status(200).json(deleteResult);
        }
        catch (error) {
            next(error);
        }
    });
});
