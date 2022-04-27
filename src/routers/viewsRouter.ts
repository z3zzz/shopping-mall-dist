import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

// views/static 폴더의 파일들(css, js 등) 라우팅
viewsRouter.use(express.static(path.join(__dirname, '../views/static')));

// html 파일들 라우팅
viewsRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});

export { viewsRouter };
