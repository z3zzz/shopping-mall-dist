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
exports.categoryMysqlModel = void 0;
const category_schema_1 = require("../schemas/category-schema");
class CategoryMysqlModel {
    findByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_schema_1.Category.findOne({ where: { title } });
            return category;
        });
    }
    findById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_schema_1.Category.findOne({ where: { _id: categoryId } });
            return category;
        });
    }
    create(categoryInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdNewCategory = yield category_schema_1.Category.create(categoryInfo);
            return createdNewCategory;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const categorys = yield category_schema_1.Category.findAll();
            return categorys;
        });
    }
    update({ categoryId, update }) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { _id: categoryId };
            yield category_schema_1.Category.update(update, { where });
            const updatedCategory = yield category_schema_1.Category.findOne({ where });
            return updatedCategory;
        });
    }
    deleteById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield category_schema_1.Category.destroy({ where: { _id: categoryId } });
            return { deletedCount };
        });
    }
}
const categoryMysqlModel = new CategoryMysqlModel();
exports.categoryMysqlModel = categoryMysqlModel;
