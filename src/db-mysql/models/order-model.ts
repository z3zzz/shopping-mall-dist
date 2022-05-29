import { Order } from '../schemas/order-schema';

interface OrderAddress {
  postalCode: string;
  address1: string;
  address2: string;
  receiverName: string;
  receiverPhoneNumber: string;
}

interface OrderInfo {
  userId: string;
  summaryTitle: string;
  totalPrice: number;
  address: OrderAddress;
  request: string;
  status?: string;
}

interface OrderData {
  _id: string;
  userId: string;
  summaryTitle: string;
  totalPrice: number;
  address: OrderAddress;
  request: string;
  status?: string;
}

interface Update {
  [key: string]: string | OrderAddress;
}

interface ToUpdate {
  orderId: string;
  update: Update;
}

class OrderMysqlModel {
  private _excludeAddressAttribute(update: Update) {
    if (!update.address) {
      return update;
    }

    const address = update.address as OrderAddress;

    const postalCode = address.postalCode;
    const address1 = address.address1;
    const address2 = address.address2;
    const receiverName = address.receiverName;
    const receiverPhoneNumber = address.receiverPhoneNumber;

    delete update.address;

    return {
      ...update,
      postalCode,
      address1,
      address2,
      receiverName,
      receiverPhoneNumber,
    };
  }

  private _includeAddressAttribute(order: Order | null): OrderData | null {
    if (!order) {
      return null;
    }

    const orderData = order.get();

    const address: OrderAddress = {
      postalCode: orderData.postalCode,
      address1: orderData.address1,
      address2: orderData.address2,
      receiverName: orderData.receiverName,
      receiverPhoneNumber: orderData.receiverPhoneNumber,
    };

    return { ...orderData, address };
  }

  async findById(orderId: string): Promise<OrderData | null> {
    const order = await Order.findOne({ where: { _id: orderId } });

    return this._includeAddressAttribute(order);
  }

  async findAllByUserId(userId: string): Promise<OrderData[]> {
    const orders = await Order.findAll({ where: { userId } });

    const ordersWithAddressAttribute = [];
    for (const order of orders) {
      ordersWithAddressAttribute.push(this._includeAddressAttribute(order)!);
    }

    return ordersWithAddressAttribute;
  }

  async create(orderInfo: OrderInfo): Promise<OrderData | null> {
    const orderInfoWithoutAddressAttribute: any = {
      ...orderInfo,
      postalCode: orderInfo.address.postalCode,
      address1: orderInfo.address.address1,
      address2: orderInfo.address.address2,
      receiverName: orderInfo.address.receiverName,
      receiverPhoneNumber: orderInfo.address.receiverPhoneNumber,
    };

    delete orderInfoWithoutAddressAttribute.address;

    const createdNewOrder = await Order.create(
      orderInfoWithoutAddressAttribute
    );

    return this._includeAddressAttribute(createdNewOrder);
  }

  async findAll(): Promise<OrderData[]> {
    const orders = await Order.findAll();

    const ordersWithAddressAttribute = [];
    for (const order of orders) {
      ordersWithAddressAttribute.push(this._includeAddressAttribute(order)!);
    }

    return ordersWithAddressAttribute;
  }

  async update({ orderId, update }: ToUpdate): Promise<OrderData | null> {
    const where = { _id: orderId };

    await Order.update(this._excludeAddressAttribute(update), { where });

    const updatedOrder = await Order.findOne({ where });

    return this._includeAddressAttribute(updatedOrder);
  }

  async deleteById(orderId: string): Promise<{ deletedCount: number }> {
    const deletedCount = await Order.destroy({ where: { _id: orderId } });

    return { deletedCount };
  }
}

const orderMysqlModel = new OrderMysqlModel();

export { orderMysqlModel };
