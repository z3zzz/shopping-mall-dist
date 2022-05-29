import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../connect';
import { Order } from './order-schema';
import { Product } from './product-schema';

class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  declare orderId: string;
  declare productId: string;
  declare quantity: number;
  declare totalPrice: number;
  declare status: CreationOptional<string>;
  declare id: CreationOptional<number>;
  declare _id: CreationOptional<string>;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

OrderItem.init(
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
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '상품 준비중',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'order_items',
  }
);

OrderItem.hasOne(Order, {
  foreignKey: '_id',
});

OrderItem.hasOne(Product, {
  foreignKey: '_id',
});

export { OrderItem };
