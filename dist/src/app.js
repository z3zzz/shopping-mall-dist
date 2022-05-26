"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routers_1 = require("./routers");
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
exports.app = app;
// CORS 에러 방지
//app.use(cors());
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express_1.default.json());
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express_1.default.urlencoded({ extended: false }));
// html, css, js 라우팅
app.use(routers_1.viewsRouter);
// api 라우팅
app.use('/api', routers_1.userRouter);
app.use('/api', routers_1.categoryRouter);
app.use('/api', routers_1.productRouter);
app.use('/api', routers_1.orderRouter);
app.use('/api', routers_1.orderItemRouter);
// 미들웨어 (에러를 error.log 파일에 기록 및, 에러를 프론트엔드에 전달)
app.use(middlewares_1.errorLogger);
app.use(middlewares_1.errorHandler);
