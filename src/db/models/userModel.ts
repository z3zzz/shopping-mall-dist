import { Service } from 'typedi';
import { model } from 'mongoose';
import { UserSchema } from '../schemas/userSchema';

const User = model('User', UserSchema);

interface UserInfo {
  email: string;
  name: string;
  password: string;
}

interface ToUpdate {
  userId: string;
  update: {
    [key: string]: string;
  };
}

@Service()
class UserModel {
  async findByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId: string) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(userInfo: UserInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }: ToUpdate) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}

export { UserModel };
