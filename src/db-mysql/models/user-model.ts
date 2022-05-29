import { User, Role } from '../schemas/user-schema';

interface UserAddress {
  postalCode: string;
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
  private _includeAddressAttribute(user: User | null): UserData | null {
    if (!user) {
      return null;
    }

    const userData = user.get();

    const address: UserAddress = {
      postalCode: userData.postalCode,
      address1: userData.address1,
      address2: userData.address2,
    };

    return { ...userData, address };
  }

  async findByEmail(email: string): Promise<UserData | null> {
    const user = await User.findOne({ where: { email } });

    return this._includeAddressAttribute(user);
  }

  async findById(userId: string): Promise<UserData | null> {
    const user = await User.findOne({ where: { _id: userId } });

    return this._includeAddressAttribute(user);
  }

  async create(userInfo: UserInfo): Promise<UserData | null> {
    const createdNewUser = await User.create(userInfo);

    return this._includeAddressAttribute(createdNewUser);
  }

  async findAll(): Promise<UserData[]> {
    const users = await User.findAll();
    return users;
  }

  async update({ userId, update }: ToUpdate): Promise<UserData | null> {
    const where = { _id: userId };

    await User.update(update, { where });

    const updatedUser = await User.findOne({ where });

    return this._includeAddressAttribute(updatedUser);
  }

  async deleteById(userId: string): Promise<{ deletedCount: number }> {
    const deletedCount = await User.destroy({ where: { _id: userId } });

    return { deletedCount };
  }
}

const userMysqlModel = new UserMysqlModel();

export { userMysqlModel };
