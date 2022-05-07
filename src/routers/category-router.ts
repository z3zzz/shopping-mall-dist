import is from '@sindresorhus/is';
import { Router } from 'express';
import { adminOnly } from '../middlewares';
import { categoryService } from '../services';

const categoryRouter = Router();

categoryRouter.post('/category', adminOnly, async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const title: string = req.body.title;
    const description: string = req.body.description;
    const imageUrl: string = req.body.imageUrl;

    // 위 데이터를 카테고리 db에 추가하기
    const newCategory = await categoryService.addCategory({
      title,
      description,
      imageUrl,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

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
  adminOnly,
  async function (req, res, next) {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }

      // req (request) 에서 데이터 가져오기
      const categoryId = req.params.categoryId;
      const title: string = req.body.title;
      const description: string = req.body.description;
      const imageUrl: string = req.body.imageUrl;

      const toUpdate = { title, description, imageUrl };

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
