import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'product-categorys',
      required: true,
    },
    menufacturer: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    detailDescription: {
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
    price: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 90,
      default: 0,
      required: false,
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
