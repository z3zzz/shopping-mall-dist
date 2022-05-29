import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../connect';
import { User } from './user-schema';
import { Category } from './category-schema';

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare title: string;
  declare sellerId: string;
  declare categoryId: string;
  declare manufacturer: string;
  declare shortDescription: string;
  declare detailDescription: string;
  declare imageKey: string;
  declare inventory: number;
  declare price: number;
  declare searchKeywords: string;
  declare isRecommended: CreationOptional<boolean>;
  declare discountPercent: CreationOptional<number>;
  declare sku: CreationOptional<string>;
  declare id: CreationOptional<number>;
  declare _id: CreationOptional<string>;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detailDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    searchKeywords: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    isRecommended: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    discountPercent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'products',
  }
);

Product.hasOne(User, {
  foreignKey: '_id',
});

Product.hasOne(Category, {
  foreignKey: '_id',
});

export { Product };
