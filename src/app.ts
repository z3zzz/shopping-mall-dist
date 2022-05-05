import express from 'express';
import { viewsRouter, userRouter, categoryRouter } from './routers';
import { errorLogger, errorHandler } from './middlewares';

const app = express();

// POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// html, css, js 라우팅
app.use(viewsRouter);

// api 라우팅
app.use('/api', userRouter);
app.use('/api', categoryRouter);

// 미들웨어 (에러를 error.log 파일에 기록 및, 에러를 프론트엔드에 전달)
app.use(errorLogger);
app.use(errorHandler);

export { app };
