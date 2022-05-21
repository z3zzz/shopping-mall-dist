import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel, UserModel, UserInfo, UserAddress, UserData } from '../db';

interface LoginInfo {
  email: string;
  password: string;
}

interface DeliveryInfo {
  phoneNumber: string;
}

interface UserInfoRequired {
  userId: string;
  currentPassword: string;
}

class UserService {
  constructor(private userModel: UserModel) {}

  async addUser(userInfo: UserInfo): Promise<UserData> {
    // 객체 destructuring
    const { email, fullName, password } = userInfo;

    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
      );
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = { fullName, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  async getUserToken(loginInfo: LoginInfo): Promise<{ token: string }> {
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
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    return { token };
  }

  async getUsers(): Promise<UserData[]> {
    const users = await this.userModel.findAll();
    return users;
  }

  // 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser(
    userInfoRequired: UserInfoRequired,
    toUpdate: Partial<UserInfo>
  ): Promise<UserData> {
    // 객체 destructuring
    const { userId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 이제 업데이트 시작

    // 비밀번호도 변경하는 경우에는 해쉬화 해주어야 함.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password!, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }

  // 위 setUser과 달리, 현재 비밀번호 없이도, 주소 혹은 번호를 수정할 수 있음.
  async saveDeliveryInfo(userId: string, deliveryInfo: Partial<DeliveryInfo>) {
    const updatedUser = await this.userModel.update({
      userId,
      update: deliveryInfo,
    });

    return updatedUser;
  }

  async getUserData(userId: string): Promise<UserData> {
    const user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    return user;
  }

  async deleteUserData(userId: string): Promise<{ result: string }> {
    const { deletedCount } = await this.userModel.deleteById(userId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${userId} 사용자 데이터의 삭제에 실패하였습니다.`);
    }

    return { result: 'success' };
  }
}

const userService = new UserService(userModel);

export { userService };
