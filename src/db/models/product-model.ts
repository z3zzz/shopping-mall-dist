import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export interface ProductInfo {
  title: string;
  sellerId: string;
  categoryId: string;
  manufacturer: string;
  shortDescription: string;
  detailDescription: string;
  imageUrl: string;
  inventory: number;
  price: number;
}

export interface ProductData {
  _id: string;
  title: string;
  sellerId: string;
  categoryId: string;
  manufacturer: string;
  shortDescription: string;
  detailDescription: string;
  imageUrl: string;
  inventory: number;
  price: number;
  discountPercent?: number;
  sku?: string;
}

interface ToUpdate {
  productId: string;
  update: {
    [key: string]: string | number;
  };
}

export class ProductModel {
  async findByTitle(title: string): Promise<ProductData> {
    const product = await Product.findOne({ title });
    return product;
  }

  async findById(productId: string): Promise<ProductData> {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  async create(productInfo: ProductInfo): Promise<ProductData> {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAll(): Promise<ProductData[]> {
    const products = await Product.find({});
    return products;
  }

  async update({ productId, update }: ToUpdate): Promise<ProductData> {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
