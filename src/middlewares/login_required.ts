import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface JWTDecoded extends JwtPayload {
  user_id: string;
}

function login_required(req: Request, res: Response, next: NextFunction) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers['authorization']?.split(' ')[1];

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!userToken) {
    console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');

    const error = new Error('로그인한 유저만 사용할 수 있는 서비스입니다.');
    next(error);

    return;
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded: JWTDecoded = jwt.verify(userToken, secretKey);

    const user_id = jwtDecoded.user_id;
    // @ts-ignore
    req.currentUserId = user_id;
    next();
  } catch (error) {
    res.status(400).send('정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.');
    return;
  }
}

export { login_required };
