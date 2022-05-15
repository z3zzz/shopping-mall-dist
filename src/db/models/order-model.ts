import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export interface OrderAddress {
  postalCode: string;
  address1: string;
  address2: string;
  receiverName: string;
  receiverPhoneNumber: number;
}

export interface OrderInfo {
  userId: string;
  totalPrice: string;
  address: OrderAddress;
  request: string;
  status?: string;
}

export interface OrderData {
  _id: string;
  userId: string;
  totalPrice: string;
  address: OrderAddress;
  request: string;
  status?: string;
}

interface ToUpdate {
  orderId: string;
  update: {
    [key: string]: string | OrderAddress;
  };
}

export class OrderModel {
  async findById(orderId: string): Promise<OrderData> {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }

  async findAllByUserId(userId: string): Promise<OrderData[]> {
    const orders = await Order.find({ userId });
    return orders;
  }

  async create(orderInfo: OrderInfo): Promise<OrderData> {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async findAll(): Promise<OrderData[]> {
    const orders = await Order.find({});
    return orders;
  }

  async update({ orderId, update }: ToUpdate): Promise<OrderData> {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
    return updatedOrder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
