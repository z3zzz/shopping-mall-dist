import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export type Role = 'basic-user' | 'admin';

export interface UserAddress {
  postalCode: string;
  address1: string;
  address2: string;
}

export interface UserInfo {
  email: string;
  fullName: string;
  password: string;
  profileImage?: string;
  phoneNumber?: number;
  address?: UserAddress;
  role?: Role;
}

export interface UserData {
  _id: string;
  email: string;
  fullName: string;
  password: string;
  role: Role;
  profileImage?: string;
  phoneNumber?: number;
  address?: UserAddress;
}

interface ToUpdate {
  userId: string;
  update: {
    [key: string]: string | number | UserAddress;
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
