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
    address: {
      type: new Schema({
        road: String,
        building: String,
        detail: String,
        postalCode: String,
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
    collection: 'order',
    timestamps: true,
  }
);

export { OrderSchema };
