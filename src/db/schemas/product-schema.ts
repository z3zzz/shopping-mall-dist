import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'product-category',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    inventory: {
      type: new Schema(
        {
          quantity: {
            type: Number,
            min: 0,
            default: 10,
          },
        },
        { timestamps: true }
      ),
      required: true,
      default: 10,
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 90,
      default: 0,
      required: true,
    },
    sku: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'product',
    timestamps: true,
  }
);

export { ProductSchema };
