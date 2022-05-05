import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categorys', CategorySchema);

export interface CategoryInfo {
  name: string;
  description: string;
  image: Buffer;
}

export interface CategoryData {
  _id: string;
  name: string;
  description: string;
  image: Buffer;
}

interface ToUpdate {
  categoryId: string;
  update: {
    [key: string]: string | Buffer;
  };
}

export class CategoryModel {
  async findByName(name: string): Promise<CategoryData> {
    const category = await Category.findOne({ name });
    return category;
  }

  async findById(categoryId: string): Promise<CategoryData> {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  }

  async create(categoryInfo: CategoryInfo): Promise<CategoryData> {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  async findAll(): Promise<CategoryData[]> {
    const categorys = await Category.find({});
    return categorys;
  }

  async update({ categoryId, update }: ToUpdate): Promise<CategoryData> {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };

    console.log({ filter, update, option });

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCategory;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
