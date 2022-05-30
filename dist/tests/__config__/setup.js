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
require("dotenv/config");
// MongoDB 서버 주소, 예를 들어 mongodb://127.0.0.1/shopping 을
// mongodb://127.0.0.1/shopping--test 로 바꿈 (즉, db 이름을 바꿈)
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        const currentDBUrl = process.env['MONGODB_URL'];
        if (!currentDBUrl) {
            throw new Error('\nMongoDB 서버 주소가 설정되지 않았습니다.\n테스트를 하기 위해서는 .env 파일이 필요합니다.\n.env파일을 생성 후, MONGODB_URL 환경변수를 로컬 혹은 아틀라스 몽고디비 url 주소로 설정해 주세요.');
        }
        // jest --watch 옵션인 경우, 이미 만들어진 testDBUrl에
        // 추가로 또 --test를 붙이지 않도록, return시킴
        if (currentDBUrl.includes('test')) {
            return;
        }
        let testDBUrl;
        if (currentDBUrl.startsWith('mongodb://')) {
            // 로컬 몽고디비 서버 사용하는 경우
            testDBUrl = currentDBUrl + '--test';
        }
        else {
            // 아틀라스 몽고디비 서버 사용하는 경우
            const urlParts = currentDBUrl.split('?');
            urlParts[0] += '--test';
            testDBUrl = urlParts.join('?');
        }
        process.env['MONGODB_URL'] = testDBUrl;
    });
}
exports.default = default_1;
