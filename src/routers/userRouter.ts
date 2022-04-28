import { Container } from 'typedi';
import { Router } from 'express';
import { login_required } from '../middlewares';
import { UserService } from '../services/userService';

const userRouter = Router();
const userService = Container.get(UserService);

userRouter.post('/api/register', async (req, res, next) => {
  try {
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

userRouter.post('/user/login', async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userService.getUserLogin({ email, password });

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/userlist', login_required, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  '/user/current',
  login_required,
  async function (req, res, next) {
    try {
      // @ts-ignore
      const user_id = req.currentUserId;
      const currentUserInfo = await userService.getUserInfo({
        user_id: user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put('/users/:id', login_required, async function (req, res, next) {
  try {
    // URI로부터 사용자 id를 추출함.
    const user_id = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { name, email, password, description };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userService.setUser({ user_id }, toUpdate);

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/users/:id', login_required, async function (req, res, next) {
  try {
    const user_id = req.params.id;
    const currentUserInfo = await userService.getUserInfo({ user_id });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
