import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    telephone: {
      type: Number,
      required: false,
    },
    address: {
      type: new Schema({
        road: String,
        building: String,
        detail: String,
        postalCode: String,
      }),
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: 'basic-user',
    },
  },
  {
    collection: 'user',
    timestamps: true,
  }
);

export { UserSchema };
