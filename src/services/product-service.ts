import { productModel, ProductModel, ProductInfo, ProductData } from '../db';

export interface ProductUpdateInfo {
  title?: string;
  categoryId?: string;
  shortDescription?: string;
  detailDescription?: string;
  imageUrl?: string;
  inventory?: number;
  price?: number;
  discountPercent?: number;
}

class ProductService {
  constructor(private productModel: ProductModel) {}

  async addProduct(productInfo: ProductInfo): Promise<ProductData> {
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

  async getProducts(): Promise<ProductData[]> {
    const products = await this.productModel.findAll();
    return products;
  }

  async setProduct(
    productId: string,
    toUpdate: Partial<ProductUpdateInfo>
  ): Promise<ProductData> {
    // 객체 destructuring
    const {
      title,
      categoryId,
      shortDescription,
      detailDescription,
      imageUrl,
      inventory,
      price,
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

    if (imageUrl) {
      product = await this.productModel.update({
        productId,
        update: { imageUrl },
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

    if (discountPercent) {
      product = await this.productModel.update({
        productId,
        update: { discountPercent },
      });
    }

    return product;
  }

  async getProductData(productId: string): Promise<ProductData> {
    const product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('해당 id의 제품은 없습니다. 다시 한 번 확인해 주세요.');
    }

    return product;
  }
}

const productService = new ProductService(productModel);

export { productService };
