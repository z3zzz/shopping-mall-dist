import {
  categoryModel,
  CategoryModel,
  CategoryInfo,
  CategoryData,
  productModel,
  ProductModel,
} from '../db';

import { categoryMysqlModel } from '../db-mysql';

class CategoryService {
  constructor(
    private categoryModel: CategoryModel,
    private productModel: ProductModel
  ) {}

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
    // 업데이트 진행
    const updatedCategory = await this.categoryModel.update({
      categoryId,
      update: toUpdate,
    });

    return updatedCategory;
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

  async deleteCategoryData(categoryId: string): Promise<{ result: string }> {
    // 만약 해당 카테고리의 제품이 1개라도 있다면, 삭제 불가함.
    const product = await this.productModel.findOneByCategoryId(categoryId);

    if (product) {
      throw new Error(
        `${categoryId} 카테고리에 등록된 제품이 있습니다. 등록된 제품이 없어야 카테고리 삭제가 가능합니다. `
      );
    }

    const { deletedCount } = await this.categoryModel.deleteById(categoryId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${categoryId} 카테고리의 삭제에 실패하였습니다`);
    }

    return { result: 'success' };
  }
}

const usedDb = process.env.USED_DB;
let categoryService: CategoryService;

if (usedDb === 'mongodb') {
  categoryService = new CategoryService(categoryModel, productModel);
} else {
  //@ts-ignore
  categoryService = new CategoryService(categoryMysqlModel, productModel);
}

export { categoryService };
