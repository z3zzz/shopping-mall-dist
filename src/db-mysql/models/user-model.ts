import { User } from '../schemas/user-schema';

interface ToUpdate {
  userId: string;
  update: {
    [key: string]: string | number | UserAddress;
  };
}

export class UserModel {
  async findByEmail(email: string): Promise<UserData | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async findById(userId: string): Promise<UserData> {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(userInfo: UserInfo): Promise<UserData> {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll(): Promise<UserData[]> {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }: ToUpdate): Promise<UserData> {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async deleteById(userId: string): Promise<{ deletedCount: number }> {
    const result = await User.deleteOne({ _id: userId });
    return result;
  }
}

const userModel = new UserModel();

export { userModel };
