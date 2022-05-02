import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel, UserModel, UserInfo, UserData } from '../db';

interface LoginInfo {
  email: string;
  password: string;
}

class UserService {
  constructor(private userModel: UserModel) {}

  async addUser(userInfo: UserInfo): Promise<UserData> {
    // 객체 destructuring
    const { email, name, password } = userInfo;

    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
      );
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = { name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  async getUserLogin(loginInfo: LoginInfo): Promise<{ token: string }> {
    // 객체 destructuring
    const { email, password } = loginInfo;

    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const token = jwt.sign({ userId: user._id }, secretKey);

    return { token };
  }

  async getUsers(): Promise<UserData[]> {
    const users = await this.userModel.findAll();
    return users;
  }

  async setUser(
    userId: string,
    toUpdate: Partial<UserInfo>
  ): Promise<UserData> {
    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // toUpdate 객체에 name 프로퍼티가 있다면, db에 업데이트함.
    if (toUpdate.name) {
      user = await this.userModel.update({
        userId,
        update: { name: toUpdate.name },
      });
    }

    if (toUpdate.email) {
      user = await this.userModel.update({
        userId,
        update: { email: toUpdate.email },
      });
    }

    if (toUpdate.password) {
      user = await this.userModel.update({
        userId,
        update: { password: toUpdate.password },
      });
    }

    return user;
  }

  async getUserInfo(userId: string): Promise<UserData> {
    const user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    return user;
  }
}

const userService = new UserService(userModel);

export { userService };
