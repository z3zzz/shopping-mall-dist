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
describe('order 관련 테스트', () => {
    // 임시 랜덤 문자열 제작용
    const random = Math.random().toString(36).substring(2, 7);
    // 각 테스트에서 공통으로 사용할 변수
    let token;
    let orderId;
    const address = {
        postalCode: '12345',
        address1: '서울시 oo로 00빌딩',
        address2: '3층 991호',
        receiverName: '튜터',
        receiverPhoneNumber: '01012345678',
    };
    const address2 = {
        postalCode: '54321',
        address1: '서울시 oo로 00빌딩2',
        address2: '3층 1111호',
        receiverName: '튜터2',
        receiverPhoneNumber: '01084911111111',
    };
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
    describe('post -> /api/order', () => {
        it('주문 db에 주문 정보가 추가된다.', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .post('/api/order')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                summaryTitle: '봄, 가을 니트 / 1개',
                totalPrice: 13000,
                address,
                request: '경비실에 맡겨 주세요.',
            });
            // 다른 테스트에 쓰일 주문 id
            orderId = res.body._id;
            expect(res.statusCode).toEqual(201);
            expect(orderId).toBeDefined();
            expect(res.body.totalPrice).toBe(13000);
            expect(res.body.address).toEqual(address);
            expect(res.body.request).toMatch(/경비실/);
        }));
    });
    describe('get -> /api/orderlist/all', () => {
        it('최소 3개의 주문 리스트 배열을 반환한다.', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.app)
                .post('/api/order')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                summaryTitle: '봄, 가을 니트 / 1개',
                totalPrice: 13000,
                address,
                request: '경비실에 맡겨 주세요.',
            });
            yield (0, supertest_1.default)(app_1.app)
                .post('/api/order')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                summaryTitle: '봄, 가을 니트 / 1개',
                totalPrice: 13000,
                address,
                request: '경비실에 맡겨 주세요.',
            });
            yield (0, supertest_1.default)(app_1.app)
                .post('/api/order')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                summaryTitle: '봄, 가을 니트 / 1개',
                totalPrice: 13000,
                address,
                request: '경비실에 맡겨 주세요.',
            });
            const res = yield (0, supertest_1.default)(app_1.app)
                .get('/api/orderlist/all')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThanOrEqual(3);
        }));
    });
    describe('get -> /api/orderlist/user', () => {
        it('최소 3개의 주문 리스트 배열을 반환한다.', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .get('/api/orderlist/user')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThanOrEqual(3);
        }));
    });
    describe('get -> /api/orders/:orderId', () => {
        it('주문 정보를 반환한다.', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .get(`/api/orders/${orderId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.totalPrice).toBe(13000);
            expect(res.body.address).toEqual(address);
            expect(res.body.request).toMatch(/경비실/);
        }));
    });
    describe('patch -> /api/orders/:orderId', () => {
        it('주문 정보의 수정이 정상적으로 이루어진다.', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .patch(`/api/orders/${orderId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                address: address2,
                request: '직접 가지러 가겠습니다.',
                status: 'pending222',
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body.address).toEqual(address2);
            expect(res.body.request).toMatch(/직접/);
            expect(res.body.status).toBe('pending222');
        }));
    });
    describe('delete -> /api/orders/:orderId', () => {
        it('주문 정보의 삭제가 정상적으로 이루어진다.', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .delete(`/api/orders/${orderId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.result).toBe('success');
        }));
    });
});
