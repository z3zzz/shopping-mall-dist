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

class ProductService {
  constructor(private productModel: OrderModel) {}

  async addProduct(productInfo: OrderInfo): Promise<OrderData> {
    // 객체 destructuring
    const { title } = productInfo;

    // 이름 중복 확인
    const product = await this.productModel.findByTitle(title);
    if (product) {
      throw new Error(
        '이 이름은 현재 사용중입니다. 다른 이름을 입력해 주세요.'
      );
    }

    // db에 저장
    const createdNewProduct = await this.productModel.create(productInfo);

    return createdNewProduct;
  }

  async getProducts(): Promise<OrderData[]> {
    const products = await this.productModel.findAll();

    return products;
  }

  async getProductsByCategoryTitle(
    categoryTitle: string
  ): Promise<OrderData[]> {
    const category = await categoryService.getCategoryDataByTitle(
      categoryTitle
    );
    const products = await this.productModel.findAllByCategoryId(category._id);

    return products;
  }

  async setProduct(
    productId: string,
    toUpdate: Partial<OrderUpdateInfo>
  ): Promise<OrderData> {
    // 객체 destructuring
    const {
      title,
      categoryId,
      shortDescription,
      detailDescription,
      imageKey,
      inventory,
      price,
      searchKeywords,
      isRecommended,
      discountPercent,
    } = toUpdate;
    // 우선 해당 id의 제품이 db에 있는지 확인
    let product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('해당 id의 제품은 없습니다. 다시 한 번 확인해 주세요.');
    }

    // toUpdate 객체에 title 프로퍼티가 있었다면, db에 업데이트함.
    if (title) {
      product = await this.productModel.update({
        productId,
        update: { title },
      });
    }

    if (categoryId) {
      product = await this.productModel.update({
        productId,
        update: { categoryId },
      });
    }

    if (shortDescription) {
      product = await this.productModel.update({
        productId,
        update: { shortDescription },
      });
    }

    if (detailDescription) {
      product = await this.productModel.update({
        productId,
        update: { detailDescription },
      });
    }

    if (imageKey) {
      product = await this.productModel.update({
        productId,
        update: { imageKey },
      });
    }

    if (inventory) {
      product = await this.productModel.update({
        productId,
        update: { inventory },
      });
    }

    if (price) {
      product = await this.productModel.update({
        productId,
        update: { price },
      });
    }

    if (searchKeywords) {
      product = await this.productModel.update({
        productId,
        update: { searchKeywords },
      });
    }

    if (isRecommended) {
      product = await this.productModel.update({
        productId,
        update: { isRecommended },
      });
    }

    if (discountPercent) {
      product = await this.productModel.update({
        productId,
        update: { discountPercent },
      });
    }

    return product;
  }

  async getProductData(productId: string): Promise<OrderData> {
    const product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('해당 id의 제품은 없습니다. 다시 한 번 확인해 주세요.');
    }

    return product;
  }
}

const productService = new ProductService(orderModel);

export { productService };
