import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares';
import { productService } from '../services';

const productRouter = Router();

productRouter.post('/product', loginRequired, async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const title: string = req.body.title;
    const categoryId: string = req.body.categoryId;
    const sellerId: string = req.currentUserId;
    const manufacturer: string = req.body.manufacturer;
    const shortDescription: string = req.body.shortDescription;
    const detailDescription: string = req.body.detailDescription;
    const imageKey: string = req.body.imageKey;
    const inventory: number = req.body.inventory;
    const price: number = req.body.price;
    const searchKeywords: string[] = req.body.searchKeywords;

    // 위 데이터를 제품 db에 추가하기
    const newProduct = await productService.addProduct({
      title,
      categoryId,
      sellerId,
      manufacturer,
      shortDescription,
      detailDescription,
      imageKey,
      inventory,
      price,
      searchKeywords,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

productRouter.get(
  '/productlist',
  loginRequired,
  async function (req, res, next) {
    try {
      // 전체 제품 목록을 얻음
      const products = await productService.getProducts();

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.get(
  '/productlist/category/:categoryTitle',
  loginRequired,
  async function (req, res, next) {
    let categoryTitle = req.params.categoryTitle;

    if (categoryTitle === 'men clothes') {
      categoryTitle = 'Men Clothes';
    }

    if (categoryTitle === 'women clothes') {
      categoryTitle = 'Women Clothes';
    }

    try {
      // 전체 사용자 목록을 얻음
      const products = await productService.getProductsByCategoryTitle(
        categoryTitle
      );

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.get(
  '/products/:productId',
  loginRequired,
  async function (req, res, next) {
    try {
      const productId = req.params.productId;
      const productData = await productService.getProductData(productId);

      res.status(200).json(productData);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.patch(
  '/products/:productId',
  loginRequired,
  async function (req, res, next) {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }

      // req (request) 에서 데이터 가져오기
      const productId = req.params.productId;
      const title: string = req.body.title;
      const categoryId: string = req.body.categoryId;
      const shortDescription: string = req.body.shortDescription;
      const detailDescription: string = req.body.detailDescription;
      const imageKey: string = req.body.imageKey;
      const inventory: number = req.body.inventory;
      const price: number = req.body.price;
      const searchKeywords: string[] = req.body.searchKeywords;
      const isRecommended: boolean = req.body.isRecommended;
      const discountPercent: number = req.body.discountPercent;

      const toUpdate = {
        title,
        categoryId,
        shortDescription,
        detailDescription,
        imageKey,
        inventory,
        price,
        searchKeywords,
        isRecommended,
        discountPercent,
      };

      // 제품 정보를 업데이트함.
      const updatedProduct = await productService.setProduct(
        productId,
        toUpdate
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.delete(
  '/products/:productId',
  loginRequired,
  async function (req, res, next) {
    try {
      const productId = req.params.productId;
      const deleteResult = await productService.deleteProductData(productId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

export { productRouter };
