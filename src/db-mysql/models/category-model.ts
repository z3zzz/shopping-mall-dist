import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categorys', CategorySchema);

export interface CategoryInfo {
  title: string;
  description: string;
  themeClass: string;
  imageKey: string;
}

export interface CategoryData {
  _id: string;
  title: string;
  description: string;
  themeClass: string;
  imageKey: string;
}

interface ToUpdate {
  categoryId: string;
  update: {
    [key: string]: string;
  };
}

export class CategoryModel {
  async findByTitle(title: string): Promise<CategoryData> {
    const category = await Category.findOne({ title });
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

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCategory;
  }

  async deleteById(categoryId: string): Promise<{ deletedCount: number }> {
    const result = await Category.deleteOne({ _id: categoryId });
    return result;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
