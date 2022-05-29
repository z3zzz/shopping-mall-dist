import { OrderItem } from '../schemas/order-item-schema';

interface OrderItemInfo {
  orderId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status?: string;
}

interface OrderItemData {
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

class OrderItemMysqlModel {
  async findById(orderItemId: string): Promise<OrderItemData | null> {
    const orderItem = await OrderItem.findOne({ where: { _id: orderItemId } });

    return orderItem;
  }

  async findAllByOrderId(orderId: string): Promise<OrderItemData[]> {
    const orderItems = await OrderItem.findAll({ where: { orderId } });

    return orderItems;
  }

  async findAllByProductId(productId: string): Promise<OrderItemData[]> {
    const orderItems = await OrderItem.findAll({ where: { productId } });

    return orderItems;
  }

  async create(orderItemInfo: OrderItemInfo): Promise<OrderItemData> {
    const createdNewOrderItem = await OrderItem.create(orderItemInfo);

    return createdNewOrderItem;
  }

  async findAll(): Promise<OrderItemData[]> {
    const orderItems = await OrderItem.findAll();

    return orderItems;
  }

  async update({
    orderItemId,
    update,
  }: ToUpdate): Promise<OrderItemData | null> {
    const where = { _id: orderItemId };

    await OrderItem.update(update, { where });

    const updatedOrderItem = await OrderItem.findOne({ where });

    return updatedOrderItem;
  }

  async deleteById(orderItemId: string): Promise<{ deletedCount: number }> {
    const deletedCount = await OrderItem.destroy({
      where: { _id: orderItemId },
    });

    return { deletedCount };
  }
}

const orderItemMysqlModel = new OrderItemMysqlModel();

export { orderItemMysqlModel };
