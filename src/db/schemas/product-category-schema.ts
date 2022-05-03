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
  },
  {
    collection: 'product-categorys',
    timestamps: true,
  }
);

export { ProductCategorySchema };
