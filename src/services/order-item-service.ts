import {
  orderItemModel,
  OrderItemModel,
  OrderItemInfo,
  OrderItemData,
} from '../db';

export interface OrderItemUpdateInfo {
  quantity?: number;
  totalPrice?: number;
  status?: string;
}

class OrderItemService {
  constructor(private orderItemModel: OrderItemModel) {}

  async addItem(orderItemInfo: OrderItemInfo): Promise<OrderItemData> {
    // db에 저장
    const createdNewOrderItem = await this.orderItemModel.create(orderItemInfo);

    return createdNewOrderItem;
  }

  async getItems(): Promise<OrderItemData[]> {
    const orderItems = await this.orderItemModel.findAll();

    return orderItems;
  }

  async getItemsByOrderId(orderId: string): Promise<OrderItemData[]> {
    const orderItems = await this.orderItemModel.findAllByOrderId(orderId);

    return orderItems;
  }

  async getItemsByProductId(productId: string): Promise<OrderItemData[]> {
    const orderItems = await this.orderItemModel.findAllByProductId(productId);

    return orderItems;
  }

  async setItem(
    orderItemId: string,
    toUpdate: Partial<OrderItemUpdateInfo>
  ): Promise<OrderItemData> {
    const updatedOrderItem = await this.orderItemModel.update({
      orderItemId,
      update: toUpdate,
    });

    return updatedOrderItem;
  }

  async getItemData(orderItemId: string): Promise<OrderItemData> {
    const orderItem = await this.orderItemModel.findById(orderItemId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!orderItem) {
      throw new Error(
        '해당 id의 주문아이템은 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    return orderItem;
  }

  async deleteItemData(orderItemId: string): Promise<{ result: string }> {
    const { deletedCount } = await this.orderItemModel.deleteById(orderItemId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${orderItemId} 주문의 삭제에 실패하였습니다`);
    }

    return { result: 'success' };
  }
}

const orderItemService = new OrderItemService(orderItemModel);

export { orderItemService };
