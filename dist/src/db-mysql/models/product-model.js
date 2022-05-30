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
exports.productMysqlModel = void 0;
const product_schema_1 = require("../schemas/product-schema");
class ProductMysqlModel {
    findByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_schema_1.Product.findOne({ where: { title } });
            return product;
        });
    }
    findById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_schema_1.Product.findOne({ where: { _id: productId } });
            return product;
        });
    }
    findOneByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_schema_1.Product.findOne({ where: { categoryId } });
            return product;
        });
    }
    findAllByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_schema_1.Product.findAll({ where: { categoryId } });
            return products;
        });
    }
    create(productInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            productInfo.searchKeywords = JSON.stringify(productInfo.searchKeywords);
            const createdNewProduct = yield product_schema_1.Product.create(productInfo);
            return createdNewProduct;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_schema_1.Product.findAll();
            return products;
        });
    }
    update({ productId, update }) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { _id: productId };
            yield product_schema_1.Product.update(update, { where });
            const updatedProduct = yield product_schema_1.Product.findOne({ where });
            return updatedProduct;
        });
    }
    deleteById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield product_schema_1.Product.destroy({ where: { _id: productId } });
            return { deletedCount };
        });
    }
}
const productMysqlModel = new ProductMysqlModel();
exports.productMysqlModel = productMysqlModel;
