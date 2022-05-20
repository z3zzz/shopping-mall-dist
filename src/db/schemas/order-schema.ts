import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    summaryTitle: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
          receiverName: String,
          receiverPhoneNumber: String,
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
    request: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: '준비중',
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
