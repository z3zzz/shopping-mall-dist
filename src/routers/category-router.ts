import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { adminOnly } from '../middlewares';
import { categoryService } from '../services';

const categoryRouter = Router();

// multiform-data 형태로 오는 사진 등의 데이터를 핸들링할 수 있게 함.
const upload = multer();

categoryRouter.post(
  '/category',
  [adminOnly, upload.single('image-file')],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // req (request) 에서 데이터 가져오기
      const name = req.body.name;
      const description = req.body.description;

      if (!req.file) {
        throw new Error(
          'Content-Type을 multipart/form-data로 설정해 주세요. 또한 사진 파일도 필요합니다.'
        );
      }

      const image = {
        data: req.file.buffer,
        mimetype: req.file.mimetype,
      };

      if (!image.data) {
        throw new Error(
          '사진 파일이 필요합니다. 파일 업로드 input 요소의 name이 image-file 이어야 합니다.'
        );
      }

      // 위 데이터를 카테고리 db에 추가하기
      const newCategory = await categoryService.addCategory({
        name,
        description,
        image,
      });

      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.get('/categorylist', adminOnly, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const categorys = await categoryService.getCategorys();

    res.status(200).json(categorys);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get(
  '/categorys/:categoryId',
  adminOnly,
  async function (req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const categoryData = await categoryService.getCategoryData(categoryId);

      res.status(200).json(categoryData);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.patch(
  '/categorys/:categoryId',
  [adminOnly, upload.single('image-file')],
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      // req (request) 에서 데이터 가져오기
      const categoryId = req.params.categoryId;
      const name = req.body.name;
      const description = req.body.description;

      const image = {
        data: req.file!.buffer,
        mimetype: req.file!.mimetype,
      };

      const toUpdate = { name, description, image };

      // 카테고리 정보를 업데이트함.
      const updatedCategory = await categoryService.setCategory(
        categoryId,
        toUpdate
      );

      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

export { categoryRouter };
