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
exports.productModel = exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const product_schema_1 = require("../schemas/product-schema");
const Product = (0, mongoose_1.model)('products', product_schema_1.ProductSchema);
class ProductModel {
    findByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product.findOne({ title });
            return product;
        });
    }
    findById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product.findOne({ _id: productId });
            return product;
        });
    }
    findOneByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product.findOne({ categoryId });
            return product;
        });
    }
    findAllByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield Product.find({ categoryId });
            return products;
        });
    }
    create(productInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdNewProduct = yield Product.create(productInfo);
            return createdNewProduct;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield Product.find({});
            return products;
        });
    }
    update({ productId, update }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: productId };
            const option = { returnOriginal: false };
            const updatedProduct = yield Product.findOneAndUpdate(filter, update, option);
            return updatedProduct;
        });
    }
    deleteById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Product.deleteOne({ _id: productId });
            return result;
        });
    }
}
exports.ProductModel = ProductModel;
const productModel = new ProductModel();
exports.productModel = productModel;
