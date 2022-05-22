"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DB_URL = process.env.MONGODB_URL ||
    'MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n';
mongoose_1.default.connect(DB_URL);
const db = mongoose_1.default.connection;
db.on('connected', () => console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL));
db.on('error', (error) => console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error));
__exportStar(require("./models/user-model"), exports);
__exportStar(require("./models/category-model"), exports);
__exportStar(require("./models/product-model"), exports);
__exportStar(require("./models/order-model"), exports);
__exportStar(require("./models/order-item-model"), exports);
