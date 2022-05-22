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
exports.productRouter = void 0;
const is_1 = __importDefault(require("@sindresorhus/is"));
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
productRouter.post('/product', middlewares_1.loginRequired, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is_1.default.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }
        // req (request) 에서 데이터 가져오기
        const title = req.body.title;
        const categoryId = req.body.categoryId;
        const sellerId = req.currentUserId;
        const manufacturer = req.body.manufacturer;
        const shortDescription = req.body.shortDescription;
        const detailDescription = req.body.detailDescription;
        const imageKey = req.body.imageKey;
        const inventory = req.body.inventory;
        const price = req.body.price;
        const searchKeywords = req.body.searchKeywords;
        // 위 데이터를 제품 db에 추가하기
        const newProduct = yield services_1.productService.addProduct({
            title,
            categoryId,
            sellerId,
            manufacturer,
            shortDescription,
            detailDescription,
            imageKey,
            inventory,
            price,
            searchKeywords,
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        next(error);
    }
}));
productRouter.get('/productlist', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 전체 제품 목록을 얻음
            const products = yield services_1.productService.getProducts();
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    });
});
productRouter.get('/productlist/category/:categoryTitle', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let categoryTitle = req.params.categoryTitle;
        try {
            // 전체 제품 목록을 얻음
            const products = yield services_1.productService.getProductsByCategoryTitle(categoryTitle);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    });
});
productRouter.get('/products/:productId', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = req.params.productId;
            const productData = yield services_1.productService.getProductData(productId);
            res.status(200).json(productData);
        }
        catch (error) {
            next(error);
        }
    });
});
productRouter.patch('/products/:productId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
            if (is_1.default.emptyObject(req.body)) {
                throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
            }
            // req (request) 에서 데이터 가져오기
            const productId = req.params.productId;
            const title = req.body.title;
            const shortDescription = req.body.shortDescription;
            const detailDescription = req.body.detailDescription;
            const imageKey = req.body.imageKey;
            const inventory = req.body.inventory;
            const price = req.body.price;
            const searchKeywords = req.body.searchKeywords;
            const isRecommended = req.body.isRecommended;
            const discountPercent = req.body.discountPercent;
            // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
            // 보내주었다면, 업데이트용 객체에 삽입함.
            const toUpdate = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (title && { title })), (shortDescription && { shortDescription })), (detailDescription && { detailDescription })), (imageKey && { imageKey })), (inventory && { inventory })), (price && { price })), (searchKeywords && { searchKeywords })), (isRecommended && { isRecommended })), (discountPercent && { discountPercent }));
            // 제품 정보를 업데이트함.
            const updatedProduct = yield services_1.productService.setProduct(productId, toUpdate);
            res.status(200).json(updatedProduct);
        }
        catch (error) {
            next(error);
        }
    });
});
productRouter.delete('/products/:productId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = req.params.productId;
            const deleteResult = yield services_1.productService.deleteProductData(productId);
            res.status(200).json(deleteResult);
        }
        catch (error) {
            next(error);
        }
    });
});
