import { User, Role } from '../schemas/user-schema';

interface UserAddress {
  poastalCode: string;
  address1: string;
  address2: string;
}

interface UserInfo {
  email: string;
  fullName: string;
  password: string;
  address?: UserAddress;
  profileImage?: string;
  phoneNumber?: string;
  role?: Role;
}

interface UserData {
  id: number;
  _id: string;
  email: string;
  fullName: string;
  password: string;
  role: Role;
  isOAuth: boolean;
  profileImage?: string;
  phoneNumber?: string;
  address?: UserAddress;
}

interface ToUpdate {
  userId: string;
  update: {
    [key: string]: string | number;
  };
}

class UserMysqlModel {
  async findByEmail(email: string): Promise<UserData | null> {
    const user = await User.findOne({ where: { email } });

    return user;
  }

  async findById(userId: string): Promise<UserData | null> {
    const user = await User.findOne({ where: { _id: userId } });
    return user;
  }

  async create(userInfo: UserInfo): Promise<UserData | null> {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll(): Promise<UserData[]> {
    const users = await User.findAll();
    return users;
  }

  async update({ userId, update }: ToUpdate): Promise<UserData | null> {
    const where = { _id: userId };

    await User.update(update, { where });

    const updatedUser = await User.findOne({ where });

    return updatedUser;
  }

  async deleteById(userId: string): Promise<{ deletedCount: number }> {
    const deletedCount = await User.destroy({ where: { _id: userId } });

    return { deletedCount };
  }
}

const userMysqlModel = new UserMysqlModel();

export { userMysqlModel };
