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
exports.productService = void 0;
const db_1 = require("../db");
class ProductService {
    constructor(productModel, categoryModel) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
    }
    addProduct(productInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            // 객체 destructuring
            const { title } = productInfo;
            // 이름 중복 확인
            const product = yield this.productModel.findByTitle(title);
            if (product) {
                throw new Error('이 이름은 현재 사용중입니다. 다른 이름을 입력해 주세요.');
            }
            // db에 저장
            const createdNewProduct = yield this.productModel.create(productInfo);
            return createdNewProduct;
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.findAll();
            return products;
        });
    }
    getProductsByCategoryTitle(categoryTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.findByTitle(categoryTitle);
            const products = yield this.productModel.findAllByCategoryId(category._id);
            return products;
        });
    }
    setProduct(productId, toUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield this.productModel.update({
                productId,
                update: toUpdate,
            });
            return updatedProduct;
        });
    }
    getProductData(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findById(productId);
            // db에서 찾지 못한 경우, 에러 메시지 반환
            if (!product) {
                throw new Error('해당 id의 제품은 없습니다. 다시 한 번 확인해 주세요.');
            }
            return product;
        });
    }
    deleteProductData(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield this.productModel.deleteById(productId);
            // 삭제에 실패한 경우, 에러 메시지 반환
            if (deletedCount === 0) {
                throw new Error(`${productId} 제품의 삭제에 실패하였습니다`);
            }
            return { result: 'success' };
        });
    }
}
const productService = new ProductService(db_1.productModel, db_1.categoryModel);
exports.productService = productService;
