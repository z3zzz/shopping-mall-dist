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
exports.categoryModel = exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const category_schema_1 = require("../schemas/category-schema");
const Category = (0, mongoose_1.model)('categorys', category_schema_1.CategorySchema);
class CategoryModel {
    findByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category.findOne({ title });
            return category;
        });
    }
    findById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category.findOne({ _id: categoryId });
            return category;
        });
    }
    create(categoryInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdNewCategory = yield Category.create(categoryInfo);
            return createdNewCategory;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const categorys = yield Category.find({});
            return categorys;
        });
    }
    update({ categoryId, update }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: categoryId };
            const option = { returnOriginal: false };
            const updatedCategory = yield Category.findOneAndUpdate(filter, update, option);
            return updatedCategory;
        });
    }
    deleteById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Category.deleteOne({ _id: categoryId });
            return result;
        });
    }
}
exports.CategoryModel = CategoryModel;
const categoryModel = new CategoryModel();
exports.categoryModel = categoryModel;
