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
    collection: 'product-category',
    timestamps: true,
  }
);

export { ProductCategorySchema };
