import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들 라우팅
viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/order/complete', serveStatic('order-complete'));
viewsRouter.use('/register', serveStatic('register'));
viewsRouter.use('/login', serveStatic('login'));
viewsRouter.use('/category/add', serveStatic('category-add'));
viewsRouter.use('/product/add', serveStatic('product-add'));
viewsRouter.use('/product/list', serveStatic('product-list'));
viewsRouter.use('/product/detail', serveStatic('product-detail'));
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/order', serveStatic('order'));
viewsRouter.use('/order/complete', serveStatic('order-complete'));
viewsRouter.use('/page-not-found', serveStatic('page-not-found'));

// views 폴더의 rabbit.png, indexed-db.js 등 라우팅
viewsRouter.use('/', serveStatic(''));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource: string) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
}

export { viewsRouter };
