import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaymentCompleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: 'order',
    timestamps: true,
  }
);

export { OrderSchema };
