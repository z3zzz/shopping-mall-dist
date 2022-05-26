import { model } from 'mongoose';
import { OrderItemSchema } from '../schemas/order-item-schema';

const OrderItem = model('order-items', OrderItemSchema);

export interface OrderItemInfo {
  orderId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status?: string;
}

export interface OrderItemData {
  _id: string;
  orderId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status?: string;
}

interface ToUpdate {
  orderItemId: string;
  update: {
    [key: string]: string | number;
  };
}

export class OrderItemModel {
  async findById(orderItemId: string): Promise<OrderItemData> {
    const orderItem = await OrderItem.findOne({ _id: orderItemId });
    return orderItem;
  }

  async findAllByOrderId(orderId: string): Promise<OrderItemData[]> {
    const orderItems = await OrderItem.find({ orderId });
    return orderItems;
  }

  async findAllByProductId(productId: string): Promise<OrderItemData[]> {
    const orderItems = await OrderItem.find({ productId });
    return orderItems;
  }

  async create(orderItemInfo: OrderItemInfo): Promise<OrderItemData> {
    const createdNewOrderItem = await OrderItem.create(orderItemInfo);
    return createdNewOrderItem;
  }

  async findAll(): Promise<OrderItemData[]> {
    const orderItems = await OrderItem.find({});
    return orderItems;
  }

  async update({ orderItemId, update }: ToUpdate): Promise<OrderItemData> {
    const filter = { _id: orderItemId };
    const option = { returnOriginal: false };

    const updatedOrderItem = await OrderItem.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedOrderItem;
  }

  async deleteById(orderItemId: string): Promise<{ deletedCount: number }> {
    const result = await OrderItem.deleteOne({ _id: orderItemId });
    return result;
  }
}

const orderItemModel = new OrderItemModel();

export { orderItemModel };
