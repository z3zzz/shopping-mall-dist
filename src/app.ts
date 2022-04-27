import express from 'express';
import { viewsRouter, userRouter } from './routers';
// 임시
import './db';

const app = express();

// POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// html, css, js 라우팅
app.use(viewsRouter);

// api 라우팅
app.use(userRouter);

export { app };
