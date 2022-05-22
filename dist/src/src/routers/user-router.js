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
exports.userRouter = void 0;
const express_1 = require("express");
const is_1 = __importDefault(require("@sindresorhus/is"));
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is_1.default.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }
        // req (request) 에서 데이터 가져오기
        const fullName = req.body.fullName;
        const email = req.body.email;
        const password = req.body.password;
        // 위 데이터를 유저 db에 추가하기
        const newUser = yield services_1.userService.addUser({
            fullName,
            email,
            password,
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
}));
// 구글 OAuth 용
userRouter.post('/register/google', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const googleToken = req.body.googleToken;
        const newUser = yield services_1.userService.addUserWithGoogle(googleToken);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
}));
// 카카오 OAuth 용
userRouter.post('/register/kakao', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const nickname = req.body.nickname;
        const newUser = yield services_1.userService.addUserWithKakao(email, nickname);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.post('/login', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
            if (is_1.default.emptyObject(req.body)) {
                throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
            }
            // req (request) 에서 데이터 가져오기
            const email = req.body.email;
            const password = req.body.password;
            // 위 데이터가 db에 있는지 확인하고,
            // db 있을 시 로그인 성공 및, 토큰 받아오기
            const userToken = yield services_1.userService.getUserToken({ email, password });
            res.status(200).json(userToken);
        }
        catch (error) {
            next(error);
        }
    });
});
userRouter.post('/user/password/check', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
            if (is_1.default.emptyObject(req.body)) {
                throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
            }
            // req (request) 에서 데이터 가져오기
            const userId = req.currentUserId;
            const password = req.body.password;
            // 비밀번호가 알맞는지 여부를 체크함
            const checkResult = yield services_1.userService.checkUserPassword(userId, password);
            res.status(200).json(checkResult);
        }
        catch (error) {
            next(error);
        }
    });
});
userRouter.post('/login/google', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const googleToken = req.body.googleToken;
            const userToken = yield services_1.userService.getUserTokenWithGoogle(googleToken);
            res.status(200).json(userToken);
        }
        catch (error) {
            next(error);
        }
    });
});
userRouter.post('/login/kakao', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const userToken = yield services_1.userService.getUserTokenWithKakao(email);
            res.status(200).json(userToken);
        }
        catch (error) {
            next(error);
        }
    });
});
// 전체 유저 목록은 관리자만 조회 가능함.
userRouter.get('/userlist', middlewares_1.adminOnly, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 전체 사용자 목록을 얻음
            const users = yield services_1.userService.getUsers();
            res.status(200).json(users);
        }
        catch (error) {
            next(error);
        }
    });
});
userRouter.get('/user', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.currentUserId;
            const currentUserInfo = yield services_1.userService.getUserData(userId);
            res.status(200).json(currentUserInfo);
        }
        catch (error) {
            next(error);
        }
    });
});
// 사용자 정보 수정
userRouter.patch('/users/:userId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // content-type 을 application/json 로 프론트에서
            // 설정 안 하고 요청하면, body가 비어 있게 됨.
            if (is_1.default.emptyObject(req.body)) {
                throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
            }
            // params로부터 id를 가져옴
            const userId = req.params.userId;
            // body data 로부터 업데이트할 사용자 정보를 추출함.
            const fullName = req.body.fullName;
            const password = req.body.password;
            const address = req.body.address;
            const phoneNumber = req.body.phoneNumber;
            const role = req.body.role;
            // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
            const currentPassword = req.body.currentPassword;
            // currentPassword 없을 시, 진행 불가
            if (!currentPassword) {
                throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
            }
            const userInfoRequired = { userId, currentPassword };
            // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
            // 보내주었다면, 업데이트용 객체에 삽입함.
            const toUpdate = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (fullName && { fullName })), (password && { password })), (address && { address })), (phoneNumber && { phoneNumber })), (role && { role }));
            // 사용자 정보를 업데이트함.
            const updatedUserInfo = yield services_1.userService.setUser(userInfoRequired, toUpdate);
            res.status(200).json(updatedUserInfo);
        }
        catch (error) {
            next(error);
        }
    });
});
// 사용자 권한 수정 (관리자만 가능)
userRouter.patch('/users/role/:userId', middlewares_1.adminOnly, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // content-type 을 application/json 로 프론트에서
            // 설정 안 하고 요청하면, body가 비어 있게 됨.
            if (is_1.default.emptyObject(req.body)) {
                throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
            }
            // params로부터 id를 가져옴
            const userId = req.params.userId;
            // body data 로부터 업데이트할 사용자 권한 정보를 추출함.
            const role = req.body.role;
            // 사용자 정보를 업데이트함.
            const updatedUserInfo = yield services_1.userService.setRole(userId, role);
            res.status(200).json(updatedUserInfo);
        }
        catch (error) {
            next(error);
        }
    });
});
// 주문 시 사용한 주소 및 연락처를 유저 데이터로 저장함.
userRouter.post('/user/deliveryinfo', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // content-type 을 application/json 로 프론트에서
            // 설정 안 하고 요청하면, body가 비어 있게 됨.
            if (is_1.default.emptyObject(req.body)) {
                throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
            }
            // 토큰으로부터 추출됐던 id를 가져옴
            const userId = req.currentUserId;
            // body data 로부터 업데이트할 사용자 정보를 추출함.
            const address = req.body.address;
            const phoneNumber = req.body.phoneNumber;
            // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
            // 보내주었다면, 업데이트용 객체에 삽입함.
            const deliveryinfo = Object.assign(Object.assign({}, (address && { address })), (phoneNumber && { phoneNumber }));
            // 사용자 정보를 업데이트함.
            const updatedUserInfo = yield services_1.userService.saveDeliveryInfo(userId, deliveryinfo);
            res.status(200).json(updatedUserInfo);
        }
        catch (error) {
            next(error);
        }
    });
});
userRouter.delete('/users/:userId', middlewares_1.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // params로부터 id를 가져옴
            const userId = req.params.userId;
            const deleteResult = yield services_1.userService.deleteUserData(userId);
            res.status(200).json(deleteResult);
        }
        catch (error) {
            next(error);
        }
    });
});
// 관리자 토큰을 가졌는지 여부를 확인함.
userRouter.get('/admin/check', middlewares_1.adminOnly, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 미들웨어 adminOnly 를 통과했다는 것은, 관리자 토큰을 가진 것을 의미함.
            res.status(200).json({ result: 'success' });
        }
        catch (error) {
            next(error);
        }
    });
});
