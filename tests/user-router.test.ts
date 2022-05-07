import { clearCollection } from './__config__/mongodb-config';
import request from 'supertest';
import { app } from '../src/app';

describe('userRouter 테스트', () => {
  afterAll(async () => {
    await clearCollection('users');
  });

  describe('post -> /api/register', () => {
    it('유저 db에 사용자 정보가 추가된다.', async () => {
      const res = await request(app)
        .post('/api/register')
        .set('Content-Type', 'application/json')
        .send({
          fullName: 'tester',
          email: 'abc@def.com',
          password: '1234',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.fullName).toBe('tester');
      expect(res.body.email).toBe('abc@def.com');
    });
  });

  describe('post -> /api/login', () => {
    it('로그인 성공 시, jwt 토큰을 반환한다.', async () => {
      const res = await request(app)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send({ email: 'abc@def.com', password: '1234' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
    });
  });

  describe('get -> /api/userlist', () => {
    it('최소 3명의 유저 리스트 배열을 반환한다.', async () => {
      await request(app)
        .post('/api/register')
        .set('Content-Type', 'application/json')
        .send({
          fullName: 'tester1',
          email: 'abc1@def.com',
          password: '1234',
        });
      await request(app)
        .post('/api/register')
        .set('Content-Type', 'application/json')
        .send({
          fullName: 'tester2',
          email: 'abc2@def.com',
          password: '1234',
        });
      await request(app)
        .post('/api/register')
        .set('Content-Type', 'application/json')
        .send({
          fullName: 'tester3',
          email: 'abc3@def.com',
          password: '1234',
        });

      const res = await request(app)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send({ email: 'abc@def.com', password: '1234' });

      const token = res.body.token;

      const res2 = await request(app)
        .get('/api/userlist')
        .set('Authorization', `Bearer ${token}`);

      expect(res2.statusCode).toEqual(200);
      expect(res2.body.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('get -> /api/user/', () => {
    it('사용자 정보를 반환한다.', async () => {
      const res = await request(app)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send({ email: 'abc@def.com', password: '1234' });

      const token = res.body.token;

      const res2 = await request(app)
        .get(`/api/user/`)
        .set('Authorization', `Bearer ${token}`);

      expect(res2.statusCode).toEqual(200);
      expect(res2.body.email).toBe('abc@def.com');
    });
  });

  describe('patch -> /api/user', () => {
    it('사용자 정보의 수정이 정상적으로 이루어진다.', async () => {
      const res = await request(app)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send({ email: 'abc@def.com', password: '1234' });

      const token = res.body.token;

      const res2 = await request(app)
        .patch(`/api/user`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send({
          email: 'abc2@def.com',
          fullName: 'tester-changed',
          currentPassword: '1234',
        });

      expect(res2.statusCode).toEqual(200);
      expect(res2.body.email).toBe('abc2@def.com');
      expect(res2.body.fullName).toBe('tester-changed');
    });
  });
});
