import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export interface ProductInfo {
  name: string;
  description: string;
  imageUrl: string;
}

export interface CategoryData {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface ToUpdate {
  categoryId: string;
  update: {
    [key: string]: string;
  };
}

export class CategoryModel {
  async findByName(name: string): Promise<CategoryData> {
    const category = await Product.findOne({ name });
    return category;
  }

  async findById(categoryId: string): Promise<CategoryData> {
    const category = await Product.findOne({ _id: categoryId });
    return category;
  }

  async create(categoryInfo: ProductInfo): Promise<CategoryData> {
    const createdNewCategory = await Product.create(categoryInfo);
    return createdNewCategory;
  }

  async findAll(): Promise<CategoryData[]> {
    const categorys = await Product.find({});
    return categorys;
  }

  async update({ categoryId, update }: ToUpdate): Promise<CategoryData> {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };

    console.log({ filter, update, option });

    const updatedCategory = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCategory;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
