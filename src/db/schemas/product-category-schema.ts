import { Schema } from 'mongoose';

const ProductCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    numberOfProducts: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    collection: 'product-categorys',
    timestamps: true,
  }
);

export { ProductCategorySchema };
