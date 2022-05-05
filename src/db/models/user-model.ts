import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export interface UserInfo {
  email: string;
  name: string;
  password: string;
}

export interface UserData {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: string;
}

interface ToUpdate {
  userId: string;
  update: {
    [key: string]: string;
  };
}

export class UserModel {
  async findByEmail(email: string): Promise<UserData> {
    const user = await User.findOne({ email });
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

    console.log({ filter, update, option });

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}

const userModel = new UserModel();

export { userModel };
