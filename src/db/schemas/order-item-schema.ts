import { Schema } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'order',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'prouct',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    isDeliveryCompleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: 'order-items',
    timestamps: true,
  }
);

export { OrderItemSchema };
