import is from '@sindresorhus/is';
import { Router } from 'express';
import { adminOnly, loginRequired } from '../middlewares';
import { orderItemService } from '../services';

const orderItemRouter = Router();

orderItemRouter.post('/orderitem', loginRequired, async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const orderId: string = req.body.orderId;
    const productId: string = req.body.productId;
    const quantity: number = req.body.quantity;
    const totalPrice: number = req.body.totalPrice;

    // 위 데이터를 제품 db에 추가하기
    const newOrderItem = await orderItemService.addItem({
      orderId,
      productId,
      quantity,
      totalPrice,
    });

    res.status(201).json(newOrderItem);
  } catch (error) {
    next(error);
  }
});

// 전체 주문아이템 목록은 관리자만 조회 가능함
orderItemRouter.get(
  '/orderitemlist/all',
  adminOnly,
  async function (req, res, next) {
    try {
      const orderItems = await orderItemService.getItems();

      res.status(200).json(orderItems);
    } catch (error) {
      next(error);
    }
  }
);

// 특정 오더번호의 주문아이템 조회
orderItemRouter.get(
  '/orderitemlist/order/:orderId',
  loginRequired,
  async function (req, res, next) {
    try {
      const orderId = req.params.orderId;
      const orderItems = await orderItemService.getItemsByOrderId(orderId);

      res.status(200).json(orderItems);
    } catch (error) {
      next(error);
    }
  }
);

// 특정 제품번호의 주문아이템 조회
orderItemRouter.get(
  '/orderitemlist/product/:productId',
  loginRequired,
  async function (req, res, next) {
    try {
      const productId = req.params.productId;
      const orderItems = await orderItemService.getItemsByProductId(productId);

      res.status(200).json(orderItems);
    } catch (error) {
      next(error);
    }
  }
);

orderItemRouter.get(
  '/orderitems/:orderItemId',
  loginRequired,
  async function (req, res, next) {
    try {
      const orderItemId = req.params.orderItemId;
      const orderData = await orderItemService.getItemData(orderItemId);

      res.status(200).json(orderData);
    } catch (error) {
      next(error);
    }
  }
);

orderItemRouter.patch(
  '/orderitems/:orderItemId',
  loginRequired,
  async function (req, res, next) {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }

      // req (request) 에서 데이터 가져오기
      const orderItemId: string = req.params.orderItemId;
      const quantity: number = req.body.quantity;
      const totalPrice: number = req.body.totalPrice;
      const status: string = req.body.status;

      // 위 데이터가 undefined가 아니라면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(quantity && { quantity }),
        ...(totalPrice && { totalPrice }),
        ...(status && { status }),
      };

      // 제품 정보를 업데이트함.
      const updatedOrderItem = await orderItemService.setItem(
        orderItemId,
        toUpdate
      );

      res.status(200).json(updatedOrderItem);
    } catch (error) {
      next(error);
    }
  }
);

orderItemRouter.delete(
  '/orderitems/:orderItemId',
  loginRequired,
  async function (req, res, next) {
    try {
      const orderItemId = req.params.orderItemId;
      const deleteResult = await orderItemService.deleteItemData(orderItemId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

export { orderItemRouter };
