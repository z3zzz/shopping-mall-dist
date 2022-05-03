import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: {
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
    image: {
      type: Buffer,
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
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
