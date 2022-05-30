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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../src/app");
describe('category 관련 테스트', () => {
    // 임시 랜덤 문자열 제작용
    const random = Math.random().toString(36).substring(2, 7);
    // 각 테스트에서 공통으로 사용할 변수
    let token;
    let categoryId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
            fullName: 'tester',
            email: `${random}@example.com`,
            password: '1234',
        });
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        token = jsonwebtoken_1.default.sign({ userId: res.body._id, role: 'admin' }, secretKey);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    describe('post -> /api/category', () => {
        it('카테고리 db에 카테고리 정보가 추가된다.', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .post('/api/category')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                title: `${random}-category`,
                description: '테스트 카테고리입니다.',
                themeClass: 'is-primary is-light',
                imageKey: 'test-category/test.png',
            });
            // 다른 테스트에 쓰일 카테고리 id
            categoryId = res.body._id;
            expect(res.statusCode).toEqual(201);
            expect(categoryId).toBeDefined();
            expect(res.body.title).toBe(`${random}-category`);
            expect(res.body.themeClass).toMatch('is-primary is-light');
            expect(res.body.imageKey).toBe('test-category/test.png');
        }));
    });
    describe('get -> /api/categorylist', () => {
        it('최소 3개의 카테고리 리스트 배열을 반환한다.', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.app)
                .post('/api/category')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                title: `${random}-category-1`,
                description: '테스트용 카테고리입니다.',
                themeClass: 'is-primary is-light',
                imageKey: 'test-category/test.png',
            });
            yield (0, supertest_1.default)(app_1.app)
                .post('/api/category')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                title: `${random}-category-2`,
                description: '테스트용 카테고리입니다.',
                themeClass: 'is-primary is-light',
                imageKey: 'test-category/test.png',
            });
            yield (0, supertest_1.default)(app_1.app)
                .post('/api/category')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                title: `${random}-category-3`,
                description: '테스트용 카테고리입니다.',
                themeClass: 'is-primary is-light',
                imageKey: 'test-category/test.png',
            });
            const res = yield (0, supertest_1.default)(app_1.app)
                .get('/api/categorylist')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThanOrEqual(3);
        }));
    });
    describe('get -> /api/categorys/:categoryId', () => {
        it('카테고리 정보를 반환한다.', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .get(`/api/categorys/${categoryId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.title).toBe(`${random}-category`);
            expect(res.body.imageKey).toBe('test-category/test.png');
        }));
    });
    describe('patch -> /api/categorys/:categoryId', () => {
        it('카테고리 정보의 수정이 정상적으로 이루어진다.', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .patch(`/api/categorys/${categoryId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                title: `${random}-category-999`,
                imageKey: 'test-category/test-change.png',
                themeClass: 'is-info',
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body.title).toBe(`${random}-category-999`);
            expect(res.body.themeClass).toMatch('is-info');
            expect(res.body.imageKey).toBe('test-category/test-change.png');
        }));
    });
    describe('delete -> /api/categorys/:categoryId', () => {
        it('카테고리 정보의 삭제가 정상적으로 이루어진다.', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .delete(`/api/categorys/${categoryId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.result).toBe('success');
        }));
    });
});
