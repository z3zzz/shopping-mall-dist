import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

// views 폴더의 css, js 라우팅
viewsRouter.use(express.static(path.join(__dirname, '../views')));

// html 파일들 라우팅
viewsRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});

export { viewsRouter };
