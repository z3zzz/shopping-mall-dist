import { Router } from 'express';
import multer from 'multer';
import { adminOnly } from '../middlewares';
import { categoryService } from '../services';

const categoryRouter = Router();

// multiform-data 형태로 오는 사진 등의 데이터를 핸들링할 수 있게 함.
const upload = multer();

categoryRouter.post(
  '/category',
  [adminOnly, upload.single('image-file')],
  async (req, res, next) => {
    try {
      // req (request) 에서 데이터 가져오기
      const name = req.body.name;
      const description = req.body.description;
      const image = req.file?.buffer;

      if (!image) {
        throw new Error(
          '사진 파일이 필요합니다. 파일 업로드 input 요소의 name이 image-file 이어야 합니다.'
        );
      }

      // 위 데이터를 유저 db에 추가하기
      const newUser = await categoryService.addCategory({
        name,
        description,
        image,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.post('/api/login', async function (req, res, next) {
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

    // 위 데이터가 db에 있는지 확인하고,
    // db 있을 시 로그인 성공 및, 토큰 받아오기
    const userToken = await categoryService.getUserToken({ email, password });

    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get(
  '/api/userlist',
  loginRequired,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await categoryService.getUsers();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.get('/api/user', loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const currentUserInfo = await categoryService.getUserData(userId);

    res.status(200).json(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

categoryRouter.patch(
  '/api/user',
  loginRequired,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }

      // 토큰으로부터 추출됐던 id를 가져옴
      const userId = req.currentUserId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;

      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      const currentPassword = req.body.currentPassword;

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
      }

      const userInfoRequired = { userId, currentPassword };
      const toUpdate = { name, email, password };

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await categoryService.setUser(
        userInfoRequired,
        toUpdate
      );

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { categoryRouter as userRouter };
