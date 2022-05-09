import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

// views 폴더의 css, js 라우팅
viewsRouter.use(express.static(path.join(__dirname, '../views')));

// html 파일들 라우팅
viewsRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});

viewsRouter.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/register-user.html'));
});

viewsRouter.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

viewsRouter.get('/admin/category', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/register-category.html'));
});

viewsRouter.get('/user/product', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/register-product.html'));
});

viewsRouter.get('/products', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/products.html'));
});

export { viewsRouter };
