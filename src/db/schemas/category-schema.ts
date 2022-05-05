import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: new Schema({
        data: Buffer,
        mimetype: String,
      }),
      required: true,
    },
    numberOfProductIds: {
      type: Number,
      required: false,
      default: 0,
    },
    numberOfTotalProducts: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    collection: 'categorys',
    timestamps: true,
  }
);

export { CategorySchema };
