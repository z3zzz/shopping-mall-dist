import { Category } from '../schemas/category-schema';

interface CategoryInfo {
  title: string;
  description: string;
  themeClass: string;
  imageKey: string;
}

interface CategoryData {
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

class CategoryMysqlModel {
  async findByTitle(title: string): Promise<CategoryData | null> {
    const category = await Category.findOne({ where: { title } });

    return category;
  }

  async findById(categoryId: string): Promise<CategoryData | null> {
    const category = await Category.findOne({ where: { _id: categoryId } });

    return category;
  }

  async create(categoryInfo: CategoryInfo): Promise<CategoryData | null> {
    const createdNewCategory = await Category.create(categoryInfo);

    return createdNewCategory;
  }

  async findAll(): Promise<CategoryData[]> {
    const categorys = await Category.findAll();

    return categorys;
  }

  async update({ categoryId, update }: ToUpdate): Promise<CategoryData | null> {
    const where = { _id: categoryId };

    await Category.update(update, { where });

    const updatedCategory = await Category.findOne({ where });

    return updatedCategory;
  }

  async deleteById(categoryId: string): Promise<{ deletedCount: number }> {
    const deletedCount = await Category.destroy({ where: { _id: categoryId } });

    return { deletedCount };
  }
}

const categoryMysqlModel = new CategoryMysqlModel();

export { categoryMysqlModel };
