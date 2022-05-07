import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'categorys',
    timestamps: true,
  }
);

export { CategorySchema };
