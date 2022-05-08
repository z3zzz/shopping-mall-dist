import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../src/app';

describe('userRouter 테스트', () => {
  // 임시 랜덤 문자열 제작용
  const random = Math.random().toString(36).substring(2, 7);

  // 여러 테스트에서 공통으로 쓸 토큰
  let token: string;

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('post -> /api/register', () => {
    it('유저 db에 사용자 정보가 추가된다.', async () => {
      const res = await request(app)
        .post('/api/register')
        .set('Content-Type', 'application/json')
        .send({
          fullName: 'tester',
          email: `${random}@def.com`,
          password: '1234',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.fullName).toBe('tester');
      expect(res.body.email).toBe(`${random}@def.com`);
    });
  });

  describe('post -> /api/login', () => {
    it('로그인 성공 시, jwt 토큰을 반환한다.', async () => {
      const res = await request(app)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send({ email: `${random}@def.com`, password: '1234' });

      token = res.body.token;

      expect(res.statusCode).toEqual(200);
      expect(token).toBeDefined();
    });
  });

  describe('get -> /api/userlist', () => {
    it('최소 3명의 유저 리스트 배열을 반환한다.', async () => {
      await request(app)
        .post('/api/register')
        .set('Content-Type', 'application/json')
        .send({
          fullName: 'tester1',
          email: `${random}1@def.com`,
          password: '1234',
        });
      await request(app)
        .post('/api/register')
        .set('Content-Type', 'application/json')
        .send({
          fullName: 'tester2',
          email: `${random}2@def.com`,
          password: '1234',
        });
      await request(app)
        .post('/api/register')
        .set('Content-Type', 'application/json')
        .send({
          fullName: 'tester3',
          email: `${random}3@def.com`,
          password: '1234',
        });

      const res = await request(app)
        .get('/api/userlist')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('get -> /api/user/', () => {
    it('사용자 정보를 반환한다.', async () => {
      const res = await request(app)
        .get(`/api/user/`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toBe(`${random}@def.com`);
    });
  });

  describe('post -> /api/user', () => {
    it('사용자 정보의 수정이 정상적으로 이루어진다.', async () => {
      const res = await request(app)
        .post(`/api/user`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send({
          email: `${random}999@def.com`,
          fullName: 'tester-changed',
          currentPassword: '1234',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toBe(`${random}999@def.com`);
      expect(res.body.fullName).toBe('tester-changed');
    });
  });
});
