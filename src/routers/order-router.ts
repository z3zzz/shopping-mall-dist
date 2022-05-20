import is from '@sindresorhus/is';
import { Router } from 'express';
import { OrderAddress } from '../db';
import { adminOnly, loginRequired } from '../middlewares';
import { orderService } from '../services';

const orderRouter = Router();

orderRouter.post('/order', loginRequired, async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const userId: string = req.currentUserId;
    const summaryTitle: string = req.body.summaryTitle;
    const totalPrice: number = req.body.totalPrice;
    const address: OrderAddress = req.body.address;
    const request: string = req.body.request;

    // 위 데이터를 제품 db에 추가하기
    const newOrder = await orderService.addOrder({
      userId,
      summaryTitle,
      totalPrice,
      address,
      request,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// 전체 주문 목록은 관리자만 조회 가능함
orderRouter.get('/orderlist/all', adminOnly, async function (req, res, next) {
  try {
    const orders = await orderService.getOrders();

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// 특정 사용자(현재 로그인한 사용자)의 주문 조회
orderRouter.get(
  '/orderlist/user',
  loginRequired,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;

      const orders = await orderService.getOrdersByUserId(userId);

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
);

orderRouter.get(
  '/orders/:orderId',
  loginRequired,
  async function (req, res, next) {
    try {
      const orderId = req.params.orderId;
      const orderData = await orderService.getOrderData(orderId);

      res.status(200).json(orderData);
    } catch (error) {
      next(error);
    }
  }
);

orderRouter.patch(
  '/orders/:orderId',
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
      const orderId: string = req.params.orderId;
      const address: OrderAddress = req.body.address;
      const request: string = req.body.request;
      const status: string = req.body.status;

      // 위 데이터가 undefined가 아니라면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(address && { address }),
        ...(request && { request }),
        ...(status && { status }),
      };

      // 제품 정보를 업데이트함.
      const updatedOrder = await orderService.setOrder(orderId, toUpdate);

      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
);

orderRouter.delete(
  '/orders/:orderId',
  loginRequired,
  async function (req, res, next) {
    try {
      const orderId = req.params.orderId;
      const deleteResult = await orderService.deleteOrderData(orderId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

export { orderRouter };
