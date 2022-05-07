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
    manufacturer: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    detailDescription: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    inventory: {
      type: Number,
      min: 0,
      default: 10,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 95,
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
