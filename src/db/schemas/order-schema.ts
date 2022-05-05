import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: new Schema({
        road: String,
        building: String,
        detail: String,
        postalCode: String,
        receiver: String,
      }),
      required: false,
    },
    isPaymentCompleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
