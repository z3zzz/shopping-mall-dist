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
    roadFullAddr: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export { UserSchema };
