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
    address: {
      type: new Schema({
        postalCode: String,
        address1: String,
        address2: String,
        receiverName: String,
        receiverPhoneNumber: Number,
      }),
      required: true,
    },
    request: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: 'pending',
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
