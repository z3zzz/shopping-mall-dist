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
exports.orderRouter = void 0;
const is_1 = __importDefault(require("@sindresorhus/is"));
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const orderRouter = (0, express_1.Router)();
exports.orderRouter = orderRouter;
orderRouter.post('/order', middlewares_1.loginRequired, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is_1.default.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }
        // req (request) 에서 데이터 가져오기
        const userId = req.currentUserId;
        const summaryTitle = req.body.summaryTitle;
        const totalPrice = req.body.totalPrice;
        const address = req.body.address;
        const request = req.body.request;
        // 위 데이터를 제품 db에 추가하기
        const newOrder = yield services_1.orderService.addOrder({
            userId,
            summaryTitle,
            totalPrice,
            address,
            request,
        });
        res.status(201).json(newOrder);
    }
    catch (error) {
        next(error);
    }
}));
// 전체 주문 목록은 관리자만 조회 가능함
orderRouter.get('/orderlist/all', middlewares_1.adminOnly, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield services_1.orderService.getOrders();
            res.status(200).json(orders);
        }
        catch (error) {
            next(error);
        }
    });
});
// 특정 사용자(현재 로그인한 사용자)의 주문 조회
orderRouter.get('/orderlist/user', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.currentUserId;
            const orders = yield services_1.orderService.getOrdersByUserId(userId);
            res.status(200).json(orders);
        }
        catch (error) {
            next(error);
        }
    });
});
orderRouter.get('/orders/:orderId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderId = req.params.orderId;
            const orderData = yield services_1.orderService.getOrderData(orderId);
            res.status(200).json(orderData);
        }
        catch (error) {
            next(error);
        }
    });
});
orderRouter.patch('/orders/:orderId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
            if (is_1.default.emptyObject(req.body)) {
                throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
            }
            // req (request) 에서 데이터 가져오기
            const orderId = req.params.orderId;
            const address = req.body.address;
            const request = req.body.request;
            const status = req.body.status;
            // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
            // 보내주었다면, 업데이트용 객체에 삽입함.
            const toUpdate = Object.assign(Object.assign(Object.assign({}, (address && { address })), (request && { request })), (status && { status }));
            // 제품 정보를 업데이트함.
            const updatedOrder = yield services_1.orderService.setOrder(orderId, toUpdate);
            res.status(200).json(updatedOrder);
        }
        catch (error) {
            next(error);
        }
    });
});
orderRouter.delete('/orders/:orderId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderId = req.params.orderId;
            const deleteResult = yield services_1.orderService.deleteOrderData(orderId);
            res.status(200).json(deleteResult);
        }
        catch (error) {
            next(error);
        }
    });
});
