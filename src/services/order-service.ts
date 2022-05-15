import {
  orderModel,
  OrderAddress,
  OrderModel,
  OrderInfo,
  OrderData,
} from '../db';

export interface OrderUpdateInfo {
  address?: OrderAddress;
  request?: string;
  status?: string;
}

class OrderService {
  constructor(private orderModel: OrderModel) {}

  async addOrder(orderInfo: OrderInfo): Promise<OrderData> {
    // db에 저장
    const createdNewOrder = await this.orderModel.create(orderInfo);

    return createdNewOrder;
  }

  async getOrders(): Promise<OrderData[]> {
    const orders = await this.orderModel.findAll();

    return orders;
  }

  async getOrdersByUserId(userId: string): Promise<OrderData[]> {
    const orders = await this.orderModel.findAllByUserId(userId);

    return orders;
  }

  async setOrder(
    orderId: string,
    toUpdate: Partial<OrderUpdateInfo>
  ): Promise<OrderData> {
    const updatedOrder = await this.orderModel.update({
      orderId,
      update: toUpdate,
    });

    return updatedOrder;
  }

  async getOrderData(orderId: string): Promise<OrderData> {
    const order = await this.orderModel.findById(orderId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!order) {
      throw new Error('해당 id의 주문은 없습니다. 다시 한 번 확인해 주세요.');
    }

    return order;
  }

  async deleteOrderData(orderID: string): Promise<{ result: string }> {
    const { deletedCount } = await this.orderModel.deleteById(orderID);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${orderID} 주문의 삭제에 실패하였습니다`);
    }

    return { result: 'success' };
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
