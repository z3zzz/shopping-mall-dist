import { Router } from 'express';
import is from '@sindresorhus/is';
import { login_required } from '../middlewares';
import { userService } from '../services/userService';

const userRouter = Router();

userRouter.post('/api/register', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      name,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/api/login', async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const userToken = await userService.getUserLogin({ email, password });

    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  '/api/userlist',
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userService.getUsers();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  '/api/current-user',
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const currentUserData = await userService.getUserInfo(userId);

      res.status(200).json(currentUserData);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.patch('/api/user', login_required, async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // URI로부터 사용자 id를 추출함.
    const userId = req.currentUserId;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;

    const toUpdate = { name, email, password };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userService.setUser(userId, toUpdate);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get('api/user', login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const currentUserInfo = await userService.getUserInfo(userId);

    res.status(200).json(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
