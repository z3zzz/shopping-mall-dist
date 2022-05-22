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
exports.categoryService = void 0;
const db_1 = require("../db");
class CategoryService {
    constructor(categoryModel, productModel) {
        this.categoryModel = categoryModel;
        this.productModel = productModel;
    }
    addCategory(categoryInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            // 객체 destructuring
            const { title } = categoryInfo;
            // 이름 중복 확인
            const category = yield this.categoryModel.findByTitle(title);
            if (category) {
                throw new Error('이 이름은 현재 사용중입니다. 다른 이름을 입력해 주세요.');
            }
            // db에 저장
            const createdNewCategory = yield this.categoryModel.create(categoryInfo);
            return createdNewCategory;
        });
    }
    getCategorys() {
        return __awaiter(this, void 0, void 0, function* () {
            const categorys = yield this.categoryModel.findAll();
            return categorys;
        });
    }
    setCategory(categoryId, toUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            // 업데이트 진행
            const updatedCategory = yield this.categoryModel.update({
                categoryId,
                update: toUpdate,
            });
            return updatedCategory;
        });
    }
    getCategoryDataById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.findById(categoryId);
            // db에서 찾지 못한 경우, 에러 메시지 반환
            if (!category) {
                throw new Error('해당 id의 카테고리는 없습니다. 다시 한 번 확인해 주세요.');
            }
            return category;
        });
    }
    getCategoryDataByTitle(categoryTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.findByTitle(categoryTitle);
            // db에서 찾지 못한 경우, 에러 메시지 반환
            if (!category) {
                throw new Error('해당 이름의 카테고리는 없습니다. 다시 한 번 확인해 주세요.');
            }
            return category;
        });
    }
    deleteCategoryData(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 만약 해당 카테고리의 제품이 1개라도 있다면, 삭제 불가함.
            const product = yield this.productModel.findOneByCategoryId(categoryId);
            if (product) {
                throw new Error(`${categoryId} 카테고리에 등록된 제품이 있습니다. 등록된 제품이 없어야 카테고리 삭제가 가능합니다. `);
            }
            const { deletedCount } = yield this.categoryModel.deleteById(categoryId);
            // 삭제에 실패한 경우, 에러 메시지 반환
            if (deletedCount === 0) {
                throw new Error(`${categoryId} 카테고리의 삭제에 실패하였습니다`);
            }
            return { result: 'success' };
        });
    }
}
const categoryService = new CategoryService(db_1.categoryModel, db_1.productModel);
exports.categoryService = categoryService;
