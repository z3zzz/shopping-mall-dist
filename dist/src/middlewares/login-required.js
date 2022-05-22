"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function loginRequired(req, res, next) {
    var _a;
    // request 헤더로부터 authorization bearer 토큰을 받음.
    const userToken = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
    // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
    if (!userToken || userToken === 'null') {
        console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
        res.status(403).json({
            result: 'forbidden-approach',
            reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
        });
        return;
    }
    // 해당 token 이 정상적인 token인지 확인
    try {
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const jwtDecoded = jsonwebtoken_1.default.verify(userToken, secretKey);
        const userId = jwtDecoded.userId;
        req.currentUserId = userId;
        next();
    }
    catch (error) {
        res.status(403).json({
            result: 'forbidden-approach',
            reason: '정상적인 토큰이 아닙니다.',
        });
        return;
    }
}
exports.loginRequired = loginRequired;
