import { Product } from '../schemas/product-schema';

interface ProductInfo {
  title: string;
  sellerId: string;
  categoryId: string;
  manufacturer: string;
  shortDescription: string;
  detailDescription: string;
  imageKey: string;
  inventory: number;
  price: number;
  searchKeywords: string;
}

interface ProductData {
  id: number;
  _id: string;
  title: string;
  sellerId: string;
  categoryId: string;
  manufacturer: string;
  shortDescription: string;
  detailDescription: string;
  imageKey: string;
  inventory: number;
  price: number;
  searchKeywords: string;
  isRecommended?: boolean;
  discountPercent?: number;
  sku?: string;
}

interface ToUpdate {
  productId: string;
  update: {
    [key: string]: string | number | boolean;
  };
}

class ProductMysqlModel {
  async findByTitle(title: string): Promise<ProductData | null> {
    const product = await Product.findOne({ where: { title } });

    return product;
  }

  async findById(productId: string): Promise<ProductData | null> {
    const product = await Product.findOne({ where: { _id: productId } });

    return product;
  }

  async findOneByCategoryId(categoryId: string): Promise<ProductData | null> {
    const product = await Product.findOne({ where: { categoryId } });

    return product;
  }

  async findAllByCategoryId(categoryId: string): Promise<ProductData[]> {
    const products = await Product.findAll({ where: { categoryId } });

    return products;
  }

  async create(productInfo: ProductInfo): Promise<ProductData> {
    productInfo.searchKeywords = JSON.stringify(productInfo.searchKeywords);

    const createdNewProduct = await Product.create(productInfo);

    return createdNewProduct;
  }

  async findAll(): Promise<ProductData[]> {
    const products = await Product.findAll();

    return products;
  }

  async update({ productId, update }: ToUpdate): Promise<ProductData | null> {
    const where = { _id: productId };

    await Product.update(update, { where });

    const updatedProduct = await Product.findOne({ where });

    return updatedProduct;
  }

  async deleteById(productId: string): Promise<{ deletedCount: number }> {
    const deletedCount = await Product.destroy({ where: { _id: productId } });

    return { deletedCount };
  }
}

const productMysqlModel = new ProductMysqlModel();

export { productMysqlModel };
