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
exports.categoryRouter = void 0;
const is_1 = __importDefault(require("@sindresorhus/is"));
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const categoryRouter = (0, express_1.Router)();
exports.categoryRouter = categoryRouter;
categoryRouter.post('/category', middlewares_1.adminOnly, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is_1.default.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }
        // req (request) 에서 데이터 가져오기
        const title = req.body.title;
        const description = req.body.description;
        const themeClass = req.body.themeClass;
        const imageKey = req.body.imageKey;
        // 위 데이터를 카테고리 db에 추가하기
        const newCategory = yield services_1.categoryService.addCategory({
            title,
            description,
            themeClass,
            imageKey,
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
        next(error);
    }
}));
categoryRouter.get('/categorylist', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 전체 카테고리 목록을 얻음
            const categorys = yield services_1.categoryService.getCategorys();
            res.status(200).json(categorys);
        }
        catch (error) {
            next(error);
        }
    });
});
categoryRouter.get('/categorys/:categoryId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryId = req.params.categoryId;
            const categoryData = yield services_1.categoryService.getCategoryDataById(categoryId);
            res.status(200).json(categoryData);
        }
        catch (error) {
            next(error);
        }
    });
});
categoryRouter.patch('/categorys/:categoryId', middlewares_1.adminOnly, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
            if (is_1.default.emptyObject(req.body)) {
                throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
            }
            // req (request) 에서 데이터 가져오기
            const categoryId = req.params.categoryId;
            const title = req.body.title;
            const description = req.body.description;
            const themeClass = req.body.themeClass;
            const imageKey = req.body.imageKey;
            // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
            // 보내주었다면, 업데이트용 객체에 삽입함.
            const toUpdate = Object.assign(Object.assign(Object.assign(Object.assign({}, (title && { title })), (description && { description })), (imageKey && { imageKey })), (themeClass && { themeClass }));
            // 카테고리 정보를 업데이트함.
            const updatedCategory = yield services_1.categoryService.setCategory(categoryId, toUpdate);
            res.status(200).json(updatedCategory);
        }
        catch (error) {
            next(error);
        }
    });
});
categoryRouter.delete('/categorys/:categoryId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryId = req.params.categoryId;
            const deleteResult = yield services_1.categoryService.deleteCategoryData(categoryId);
            res.status(200).json(deleteResult);
        }
        catch (error) {
            next(error);
        }
    });
});
