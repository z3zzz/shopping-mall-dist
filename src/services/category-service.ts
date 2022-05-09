import {
  categoryModel,
  CategoryModel,
  CategoryInfo,
  CategoryData,
} from '../db';

class CategoryService {
  constructor(private categoryModel: CategoryModel) {}

  async addCategory(categoryInfo: CategoryInfo): Promise<CategoryData> {
    // 객체 destructuring
    const { title } = categoryInfo;

    // 이름 중복 확인
    const category = await this.categoryModel.findByTitle(title);
    if (category) {
      throw new Error(
        '이 이름은 현재 사용중입니다. 다른 이름을 입력해 주세요.'
      );
    }

    // db에 저장
    const createdNewCategory = await this.categoryModel.create(categoryInfo);

    return createdNewCategory;
  }

  async getCategorys(): Promise<CategoryData[]> {
    const categorys = await this.categoryModel.findAll();
    return categorys;
  }

  async setCategory(
    categoryId: string,
    toUpdate: Partial<CategoryInfo>
  ): Promise<CategoryData> {
    // 객체 destructuring
    const { title, description, themeClass, imageKey } = toUpdate;
    // 우선 해당 id의 카테고리가 db에 있는지 확인
    let category = await this.categoryModel.findById(categoryId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!category) {
      throw new Error(
        '해당 id의 카테고리는 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // toUpdate 객체에 title 프로퍼티가 있었다면, db에 업데이트함.
    if (title) {
      category = await this.categoryModel.update({
        categoryId,
        update: { title },
      });
    }

    if (description) {
      category = await this.categoryModel.update({
        categoryId,
        update: { description },
      });
    }

    if (themeClass) {
      category = await this.categoryModel.update({
        categoryId,
        update: { themeClass },
      });
    }

    if (imageKey) {
      category = await this.categoryModel.update({
        categoryId,
        update: { imageKey },
      });
    }

    return category;
  }

  async getCategoryDataById(categoryId: string): Promise<CategoryData> {
    const category = await this.categoryModel.findById(categoryId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!category) {
      throw new Error(
        '해당 id의 카테고리는 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    return category;
  }

  async getCategoryDataByTitle(categoryTitle: string): Promise<CategoryData> {
    const category = await this.categoryModel.findByTitle(categoryTitle);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!category) {
      throw new Error(
        '해당 이름의 카테고리는 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    return category;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
