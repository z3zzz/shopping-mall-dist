import { Schema } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'orders',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'proucts',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: 'pending',
    },
  },
  {
    collection: 'order-items',
    timestamps: true,
  }
);

export { OrderItemSchema };
