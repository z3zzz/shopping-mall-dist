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
  declare _id: CreationOptional<string>;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

OrderItem.init(
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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

//OrderItem.belongsTo(Order, {
//foreignKey: {
//name: 'orderId',
//allowNull: false,
//},
//});

//OrderItem.belongsTo(Product, {
//foreignKey: {
//name: 'productId',
//allowNull: false,
//},
//});

export { OrderItem };
